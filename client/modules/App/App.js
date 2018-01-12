import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';

// Import Actions
import selectBranch from './components/actions/BranchActions';
import { createProject, controlDrawer, controlDialog } from './components/actions/ProjectActions';


const muiTheme = getMuiTheme(
  {
    palette: {},
  }, {
    avatar: {
      borderColor: null,
    },
    userAgent: 'all',
  }
);


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  chooseBranch = (e) => {
    this.props.dispatch(selectBranch(e));
  }

  handleDrawer = () => {
    this.props.dispatch(controlDrawer());
  }

  handleDialog = () => {
    this.props.dispatch(controlDialog());
  };

  createNewProject = (name) => {
    this.props.dispatch(createProject(name));
    this.handleDialog();
  }

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
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
                    content: 'IE=edge',
                  },
                  {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                  },
                ]}
              />
            </div>
            <div>
              {
                React.cloneElement(this.props.children, {
                  branches: this.props.branches,
                  pickBranch: this.chooseBranch,
                  activeBranch: this.props.activeBranch,
                  projects: this.props.projects,
                  createNewProject: this.createNewProject,
                  handleDialog: this.handleDialog,
                  handleDrawer: this.handleDrawer,
                })
              }
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  location: PropTypes.object,
  branches: PropTypes.array,
  activeBranch: PropTypes.string,
  projects: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    branches: store.branches,
    activeBranch: store.activeBranch,
    projects: store.projects,
  };
}

export default connect(mapStateToProps)(App);
