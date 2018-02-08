import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';

// Import Actions
import { branchSelector } from './components/actions/BranchActions';
import { createProject, controlDrawer, controlDialog, controlTokenDialog } from './components/actions/ProjectActions';

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

  handleDialog = () => {
    this.props.dispatch(controlDialog());
  };

  handleTokenDialog = () => {
    this.props.dispatch(controlTokenDialog());
  }

  createNewProject = (name) => {
    this.props.dispatch(createProject(name));
    this.handleDialog();
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
                  branches: this.props.branches,
                  selectBranch: this.chooseBranch,
                  activeBranchData: this.props.activeBranchData,
                  sampleGraph: this.props.sampleGraph,
                  projects: this.props.projects,
                  createNewProject: this.createNewProject,
                  handleDialog: this.handleDialog,
                  handleTokenDialog: this.handleTokenDialog,
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
  location: PropTypes.object,
  branches: PropTypes.array,
  activeBranchData: PropTypes.array,
  sampleGraph: PropTypes.object,
  projects: PropTypes.object.isRequired,
};

// Retrieve data from store and pass them over as props
function mapStateToProps(store) {
  return {
    branches: store.branches.branches,
    activeBranchData: store.branches.activeBranchData,
    projects: store.projects,
    sampleGraph: store.branches.sampleGraph,
  };
}

export default connect(mapStateToProps)(App);
