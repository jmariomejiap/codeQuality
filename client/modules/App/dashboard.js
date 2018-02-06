import React, { PropTypes } from 'react';
import CreateDialog from './components/dashboardComponents/createProjectDialog';
import TokenDialog from './components/dashboardComponents/tokenDialog';
import Header from './components/dashboardComponents/header';
import DrawerMenu from './components/dashboardComponents/drawerMenu';
import LineChart from './components/dashboardComponents/lineChart';
import BranchDialog from './components/dashboardComponents/branchDialog';

const Dashboard = (props) => {
  const {
    projects,
    handleDrawer,
    handleDialog,
    handleTokenDialog,
    branches,
    currentBranch,
    branchDialogIsOpen,
    handleBranchDialog,
    pickBranch,
    activeBranchData,
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
        handleBranchDialog={handleBranchDialog}
        currentBranch={currentBranch}
      />
      <DrawerMenu
        drawerState={drawerIsOpen}
        handleDrawer={handleDrawer}
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
      <BranchDialog
        branches={branches}
        selectBranch={pickBranch}
        dialogState={branchDialogIsOpen}
        handleBranchDialog={handleBranchDialog}
      />
      <div style={styles.container}>
        <LineChart
          activeBranchData={activeBranchData}
          sampleData={sampleGraph}
        />
      </div>
    </div>
  );
};


Dashboard.propTypes = {
  activeBranchData: PropTypes.array,
  branches: PropTypes.array,
  currentBranch: PropTypes.string,
  branchDialogIsOpen: PropTypes.bool,
  handleBranchDialog: PropTypes.func,
  sampleGraph: PropTypes.object,
  projects: PropTypes.object.isRequired,
  pickBranch: PropTypes.func.isRequired,
  createNewProject: PropTypes.func.isRequired,
  handleDialog: PropTypes.func.isRequired,
  handleTokenDialog: PropTypes.func,
  handleDrawer: PropTypes.func.isRequired,
};

export default Dashboard;
