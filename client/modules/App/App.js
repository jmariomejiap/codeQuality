import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';

// Import Actions
import {
  createProjectApi,
  fetchProjects,
  controlDrawer,
  controlProjectDialog,
  controlTokenDialog,
  selectProject,
  // updateNextAction,
} from './components/actions/ProjectActions';

import { fetchBranches, fetchBranchCommits } from './components/actions/BranchActions';


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
    this.props.dispatch(fetchProjects());
  }

  componentDidUpdate(prevProps, prevState) { // eslint-disable-line
    /*
    console.log('prevProps =', prevProps.projects);
    console.log('prevState = ', prevState);
    const nextAction = prevProps.projects.nextAction;
    const projectId = prevProps.projects.activeProject.projectId;
    console.log('nextAction = ', nextAction);
    console.log('and projectId = ', projectId);
    if (nextAction === 'FETCH_BRANCHES') {
      this.props.dispatch(fetchBranches(projectId));
      this.props.dispatch(updateNextAction('DONE'));
    }
    */
  }

  // functions to handle dialogs
  handleDrawer = () => { // eslint-disable-line
    this.props.dispatch(controlDrawer());
  }

  handleProjectDialog = () => {
    this.props.dispatch(controlProjectDialog());
  };

  handleTokenDialog = () => {
    this.props.dispatch(controlTokenDialog());
  }

  // functions connect to api
  createNewProject = (name) => {
    this.props.dispatch(createProjectApi(name));
    this.handleProjectDialog();
  }

  chooseProject = (name) => {
    this.props.dispatch(selectProject(name));
    // this.props.dispatch(updateNextAction('FETCH_BRANCHES'));
    this.findBranches(name);
  }

  chooseBranch = (e) => {
    this.props.dispatch(fetchBranchCommits(this.props.projects.activeProject.projectId, e));
  }

  findBranches = (projectName) => {
    const project = this.props.projects.projectsData.filter((obj) => projectName === obj.name);
    this.props.dispatch(fetchBranches(project[0]._id));
    this.props.dispatch(fetchBranchCommits(project[0]._id, project[0].activeBranch));
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
                  selectProject: this.chooseProject,
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
