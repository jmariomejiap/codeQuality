import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// components
import Header from './components/dashboardComponents/header';
import DrawerMenu from './components/dashboardComponents/drawerMenu';
import CreateDialog from './components/dashboardComponents/createProjectDialog';
import TokenDialog from './components/dashboardComponents/tokenDialog';
import LineChart from './components/dashboardComponents/lineChart';
import EmptyProjectPage from './EmptyProject';


// Import Actions
import { fetchProjects } from './components/actions/ProjectActions';
import { fetchBranches, fetchBranchCommits, setNextAction, searchingBranch } from './components/actions/BranchActions';


const styles = {
  chartStyle: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  dashboardStyle: {
    height: '100vh',
  },
};

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
          .then(() => {
            this.props.dispatch(setNextAction('complete'));
            this.props.dispatch(searchingBranch('master'));
          });
        return;
      }

      this.props.dispatch(fetchBranchCommits(projectId, listBranches[0]))
          .then(() => {
            this.props.dispatch(setNextAction('completeNoMaster'));
            this.props.dispatch(searchingBranch(listBranches[0]));
          });
    }
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
            <div style={styles.dashboardStyle} >
              <Header />
              <DrawerMenu />
              <CreateDialog />
              <TokenDialog />
              {(this.props.projects.projectsName.length === 0) ?
                <EmptyProjectPage /> :
                <div style={styles.chartStyle}>
                  <LineChart />
                </div>
              }
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
