import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';

// components
import Header from './components/dashboardComponents/header';
import DrawerMenu from './components/dashboardComponents/drawerMenu';
import CreateDialog from './components/dashboardComponents/createProjectDialog';
import TokenDialog from './components/dashboardComponents/tokenDialog';
import LineChart from './components/dashboardComponents/lineChart';
import EmptyProjectPage from './EmptyProject';


// Import Actions
import { fetchProjects, foundEmptyProjects } from './components/actions/ProjectActions';
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
  spinnerStyle: {
    position: 'absolute',
    top: '50%',
    left: '45%',
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
    this.state = {
      isMounted: false,
      spinnerIndicator: 'loading',
    };
  }

  componentDidMount() {
    this.setState({isMounted: true, spinnerIndicator: 'mounted'}); // eslint-disable-line
    const nextAction = this.props.nextAction;
    if (nextAction === 'loading') {
      this.props.dispatch(fetchProjects())
        .then((result) => {
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
              {(this.state.spinnerIndicator === 'loading') ?
                <div style={styles.spinnerStyle}>
                  <CircularProgress size={100} thickness={8} />
                </div> :
                null
              }
              {(this.props.projectsName.length === 0) ?
                null :
                <div style={styles.chartStyle}>
                  <LineChart />
                </div>
              }
              {(this.props.noProjectsFound) ? <EmptyProjectPage /> : null}
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
};

// Retrieve data from store and pass them over as props
function mapStateToProps(store) {
  return {
    nextAction: store.branches.nextAction,
    projectsName: store.projects.projectsName,
    activeProject: store.projects.activeProject,
    noProjectsFound: store.projects.noProjectsFound,
    branches: store.branches.branches,
  };
}

export default connect(mapStateToProps)(App);

/*
<RefreshIndicator
                size={100}
                left={600}
                top={400}
                status={this.state.spinnerIndicator}
                // style={style.refresh}
              />
              */
