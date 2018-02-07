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
    selectBranch,
    activeBranchData,
    createNewProject,
    sampleGraph,
  } = props;

  const { drawerIsOpen, projectDialogIsOpen, tokenDialogIsOpen, data } = projects;

  const styles = {
    header: {
      paddingLeft: drawerIsOpen ? '14%' : 0,
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
        selectBranch={selectBranch}
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
  sampleGraph: PropTypes.object,
  projects: PropTypes.object.isRequired,
  selectBranch: PropTypes.func.isRequired,
  createNewProject: PropTypes.func.isRequired,
  handleDialog: PropTypes.func.isRequired,
  handleTokenDialog: PropTypes.func,
  handleDrawer: PropTypes.func.isRequired,
};

export default Dashboard;
