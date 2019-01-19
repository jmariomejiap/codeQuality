import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';
import DevTools from './DevTools';
// socket.io
import io from 'socket.io-client';

// components
import Header from '../components/Header';
import DrawerMenu from '../components/DrawerMenu';
import CreateDialog from '../components/CreateProjectDialog';
import TokenDialog from '../components/TokenDialog';
import LineChart from '../components/LineChart';
import EmptyProjectPage from '../components/EmptyProject';

// Import Actions
import {
  fetchProjects,
  foundEmptyProjects
} from '../redux/actions/ProjectActions';
import {
  fetchBranches,
  fetchBranchCommits,
  setNextAction,
  searchingBranch,
  subscribeSocket,
  addNewCommit
} from '../redux/actions/BranchActions';

const styles = {
  chartStyle: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
  },
  dashboardStyle: {
    height: '100vh'
  },
  spinnerStyle: {
    position: 'absolute',
    top: '50%',
    left: '45%'
  }
};

// material-ui variables.
const muiTheme = getMuiTheme(
  {
    palette: {}
  },
  {
    avatar: {
      borderColor: null
    },
    userAgent: 'all'
  }
);

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      spinnerIndicator: 'loading'
    };
  }

  componentDidMount() {
    const socketIO = io('/');
    socketIO.on('connect', () => {
      this.props.dispatch(subscribeSocket(socketIO));
    });

    socketIO.on('new commit', data => {
      this.props.dispatch(addNewCommit(data));
    });

    this.setState({ isMounted: true, spinnerIndicator: 'mounted' }); // eslint-disable-line

    const nextAction = this.props.nextAction;
    if (nextAction === 'loading') {
      this.props.dispatch(fetchProjects()).then(result => {
        if (result === 'empty projects') {
          this.props.dispatch(setNextAction('No project available'));
          return this.props.dispatch(foundEmptyProjects());
        }

        return this.props.dispatch(setNextAction('fetchBranches'));
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { nextAction } = nextProps;
    if (nextAction === 'No project available') {
      return;
    }

    const projectId = nextProps.activeProject.projectId;
    const listBranches = nextProps.branches;

    if (nextAction === 'fetchBranches') {
      this.props
        .dispatch(fetchBranches(projectId))
        .then(() => this.props.dispatch(setNextAction('fetchCommits')));
    }

    if (nextAction === 'fetchCommits') {
      if (listBranches.length === 0) {
        this.props.dispatch(setNextAction('Project has No branches'));
        return;
      }
      if (listBranches.includes('master')) {
        this.props
          .dispatch(fetchBranchCommits(projectId, 'master'))
          .then(() => {
            this.props.dispatch(setNextAction('complete'));
            this.props.dispatch(searchingBranch('master'));
            this.props.socket.emit('user current position', {
              projectId,
              branch: 'master'
            });
          });
        return;
      }

      this.props
        .dispatch(fetchBranchCommits(projectId, listBranches[0]))
        .then(() => {
          this.props.dispatch(setNextAction('completeNoMaster'));
          this.props.dispatch(searchingBranch(listBranches[0]));

          this.props.socket.emit('user current position', {
            projectId,
            branch: listBranches[0]
          });
        });
    }
  }

  render() {
    return (
      <div style={{ backgroundColor: '#FFFFFF', height: '100vh' }}>
        {this.state.isMounted &&
          !window.devToolsExtension &&
          process.env.NODE_ENV === 'development' && <DevTools />}
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <div>
              <Helmet
                title="Code Quality"
                titleTemplate="%s - Blog App"
                meta={[
                  { charset: 'utf-8' },
                  {
                    'http-equiv': 'X-UA-Compatible',
                    content: 'IE=edge'
                  },
                  {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                  }
                ]}
              />
            </div>
            <div style={styles.dashboardStyle}>
              <Header />
              <DrawerMenu />
              <CreateDialog />
              <TokenDialog />
              {this.state.spinnerIndicator === 'loading' ? (
                <div style={styles.spinnerStyle}>
                  <CircularProgress size={100} thickness={8} />
                </div>
              ) : null}
              {this.props.projectsName.length === 0 ? null : (
                <div style={styles.chartStyle}>
                  <LineChart />
                </div>
              )}
              {this.props.noProjectsFound ? <EmptyProjectPage /> : null}
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nextAction: PropTypes.string,
  projectsName: PropTypes.array,
  activeProject: PropTypes.object,
  noProjectsFound: PropTypes.bool,
  branches: PropTypes.array,
  socket: PropTypes.func
};

// Retrieve data from store and pass them over as props
function mapStateToProps(store) {
  return {
    nextAction: store.branches.nextAction,
    projectsName: store.projects.projectsName,
    activeProject: store.projects.activeProject,
    noProjectsFound: store.projects.noProjectsFound,
    branches: store.branches.branches,
    socket: store.branches.socket
  };
}

export default connect(mapStateToProps)(App);
