import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
// new for socket.io configuration
import http from 'http';
import socketIO from 'socket.io';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

// Run Webpack dev server in development mode
/* istanbul ignore if */
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    })
  );
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import { configureStore } from '../client/redux/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
import routes from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import dummyData from './dummyData';
import serverConfig from './config';
import project from './modules/project/routes';
import branches from './modules/branches/routes';
import commits from './modules/commits/routes';
import commitsHistory from './modules/commitsHistory/routes';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, error => {
  /* istanbul ignore if */
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'development') {
    dummyData();
  }
});

// socket.io config
const server = http.createServer(app);
const io = socketIO(server);

const activeSockets = { dummy: {} };

app.set('socketIO', io);

io.on('connection', socket => {
  // console.log('a user connected', socket.id);
  activeSockets[socket.id] = {};
  socket.emit('message', 'my message from server');

  socket.on('user current position', data => {
    const { projectId, branch } = data;
    activeSockets[socket.id] = { projectId, branch };
  });

  socket.on('disconnect', () => {
    delete activeSockets[socket.id];
  });
});

app.set('activeSockets', activeSockets);

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist/client')));
app.use('/api/v1/project', project);
app.use('/api/v1/branches', branches);
app.use('/api/v1/commit', commits);
app.use('/api/v1/commitshistory', commitsHistory);

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest =
    process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest =
    process.env.webpackChunkAssets &&
    JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${
          process.env.NODE_ENV === 'production'
            ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />`
            : ''
        }
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
        <link href="https://fonts.googleapis.com/css?family=Squada+One|Roboto|Roboto+Condensed:400,700" rel="stylesheet">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${
            process.env.NODE_ENV === 'production'
              ? `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>`
              : ''
          }
        </script>
        <script src='${
          process.env.NODE_ENV === 'production'
            ? assetsManifest['/vendor.js']
            : '/vendor.js'
        }'></script>
        <script src='${
          process.env.NODE_ENV === 'production'
            ? assetsManifest['/app.js']
            : '/app.js'
        }'></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace =
    process.env.NODE_ENV !== 'production'
      ? `:<br><br><pre style="color:red">${softTab}${err.stack.replace(
          /\n/g,
          `<br>${softTab}`
        )}</pre>`
      : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    /* istanbul ignore if */
    if (err) {
      return res.status(500).end(renderError(err));
    }

    /* istanbul ignore if */
    if (redirectLocation) {
      return res.redirect(
        302,
        redirectLocation.pathname + redirectLocation.search
      );
    }

    /* istanbul ignore if */
    if (!renderProps) {
      return next();
    }

    const store = configureStore();

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const finalState = store.getState();

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch(error => next(error));
  });
});

// start app
// app.listen(serverConfig.port, (error) => {
server.listen(serverConfig.port, error => {
  if (!error) {
    console.log(
      `CodeQuality is running on port: ${
        serverConfig.port
      }! Send your code coverage!`
    ); // eslint-disable-line
  }
});

export default app;
