import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';

// Import Actions
import {
  fetchProjects,
  controlDrawer,
  controlProjectDialog,
  controlTokenDialog,
  selectProject,
  updateCreateProjectInput,
} from './components/actions/ProjectActions';

import {
  fetchBranches,
  fetchBranchCommits,
  setNextAction,
  resetBranchDuration,
} from './components/actions/BranchActions';


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
    const nextAction = this.props.branches.nextAction;
    if (nextAction === 'loading') {
      this.props.dispatch(fetchProjects())
        .then(() => this.props.dispatch(setNextAction('fetchBranches')));
    }
  }


  componentWillReceiveProps(nextProps) {
    const { nextAction } = nextProps.branches;
    const projectId = nextProps.projects.activeProject.projectId;
    const listBranches = nextProps.branches.branches;

    if (nextAction === 'fetchBranches') {
      this.props.dispatch(fetchBranches(projectId))
        .then(() => this.props.dispatch(setNextAction('fetchCommits')));
    }

    if (nextAction === 'fetchCommits') {
      if (listBranches.length === 0) {
        this.props.dispatch(setNextAction('Project has No branches'));
        return;
      }
      if (listBranches.includes('master')) {
        this.props.dispatch(fetchBranchCommits(projectId, 'master'))
          .then(() => this.props.dispatch(setNextAction('complete')));
        return;
      }
      this.props.dispatch(fetchBranchCommits(projectId, listBranches[0]))
          .then(() => this.props.dispatch(setNextAction('completeNoMaster')));
    }
  }

  // functions to handle dialogs
  handleDrawer = () => { // eslint-disable-line
    this.props.dispatch(controlDrawer());
  }

  handleProjectDialog = () => {
    this.props.dispatch(controlProjectDialog());
  };

  // inside component TokenDialog.... delete
  handleTokenDialog = () => {
    this.props.dispatch(controlTokenDialog());
  }
// inside componentd ... delete
  handleCreateProjectInput = (value) => {
    this.props.dispatch(updateCreateProjectInput(value));
  }

  // functions connect to api
  chooseProject = (name) => {
    this.props.dispatch(selectProject(name));
    this.props.dispatch(resetBranchDuration());
    this.findBranches(name);
  }

  chooseBranch = (e) => {
    this.props.dispatch(fetchBranchCommits(this.props.projects.activeProject.projectId, e));
  }

  findBranches = (projectName) => {
    const project = this.props.projects.projectsData.filter((obj) => projectName === obj.name);
    this.props.dispatch(fetchBranches(project[0]._id))
      .then(() => this.props.dispatch(setNextAction('fetchCommits')));
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
                  handleDrawer: this.handleDrawer,
                  handleProjectDialog: this.handleProjectDialog,
                  handleCreateProjectInput: this.handleCreateProjectInput,
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
