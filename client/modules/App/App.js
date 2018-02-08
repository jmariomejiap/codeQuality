import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';

// Import Actions
import { branchSelector } from './components/actions/BranchActions';
import { createProject, controlDrawer, controlProjectDialog, controlTokenDialog } from './components/actions/ProjectActions';

// material-ui variables.
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
    this.props.dispatch(branchSelector(e));
  }

  handleDrawer = () => {
    this.props.dispatch(controlDrawer());
  }

  handleProjectDialog = () => {
    this.props.dispatch(controlProjectDialog());
  };

  handleTokenDialog = () => {
    this.props.dispatch(controlTokenDialog());
  }

  createNewProject = (name) => {
    this.props.dispatch(createProject(name));
    this.handleProjectDialog();
  }

  render() {
    return (
      <div style={{ backgroundColor: '#FFFFFF', height: '100vh' }}>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <MuiThemeProvider muiTheme={muiTheme}>
          <div >
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
                  // store props
                  projects: this.props.projects,
                  branchesData: this.props.branches,
                  // functions
                  createNewProject: this.createNewProject,
                  handleDrawer: this.handleDrawer,
                  handleProjectDialog: this.handleProjectDialog,
                  handleTokenDialog: this.handleTokenDialog,
                  selectBranch: this.chooseBranch,
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
  location: PropTypes.object,
  branches: PropTypes.object,
  projects: PropTypes.object.isRequired,
};

// Retrieve data from store and pass them over as props
function mapStateToProps(store) {
  return {
    branches: store.branches,
    projects: store.projects,
  };
}

export default connect(mapStateToProps)(App);
