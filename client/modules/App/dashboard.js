import React, { PropTypes } from 'react';
import CreateDialog from './components/dashboardComponents/createProjectDialog';
import TokenDialog from './components/dashboardComponents/tokenDialog';
import Header from './components/dashboardComponents/header';
import DrawerMenu from './components/dashboardComponents/drawerMenu';
import LineChart from './components/dashboardComponents/lineChart';

const Dashboard = (props) => {
  const {
    projects,
    handleDrawer,
    handleDialog,
    handleTokenDialog,
    branches,
    pickBranch,
    activeBranch,
    createNewProject,
    sampleGraph,
  } = props;

  const { drawerIsOpen, projectDialogIsOpen, tokenDialogIsOpen, data } = projects;

  const styles = {
    header: {
      paddingLeft: drawerIsOpen ? 260 : 0,
      backgroundColor: 'red',
    },
    container: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
    },
  };

  return (
    <div style={{ height: '100vh' }} >
      <Header
        styles={styles.header}
        handleDrawer={handleDrawer}
        branches={branches}
        selectBranch={pickBranch}
        activeBranch={activeBranch}
      />
      <DrawerMenu
        drawerState={drawerIsOpen}
        handleDialog={handleDialog}
        projects={data}
      />
      <CreateDialog
        dialogState={projectDialogIsOpen}
        controlDialog={handleDialog}
        createNewProject={createNewProject}
      />
      <TokenDialog
        dialogState={tokenDialogIsOpen}
        controlDialog={handleTokenDialog}
      />
      <div style={styles.container}>
        <LineChart
          activeBranch={activeBranch}
          sampleData={sampleGraph}
        />
      </div>
    </div>
  );
};


Dashboard.propTypes = {
  activeBranch: PropTypes.array,
  branches: PropTypes.array,
  sampleGraph: PropTypes.object,
  projects: PropTypes.object.isRequired,
  pickBranch: PropTypes.func.isRequired,
  createNewProject: PropTypes.func.isRequired,
  handleDialog: PropTypes.func.isRequired,
  handleTokenDialog: PropTypes.func,
  handleDrawer: PropTypes.func.isRequired,
};

export default Dashboard;
