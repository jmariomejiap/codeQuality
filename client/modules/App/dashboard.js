import React, { PropTypes } from 'react';
import CreateDialog from './components/dashboardComponents/createProjectDialog';
import TokenDialog from './components/dashboardComponents/tokenDialog';
import Header from './components/dashboardComponents/header';
import DrawerMenu from './components/dashboardComponents/drawerMenu';
import LineChart from './components/dashboardComponents/lineChart';
import EmptyProjectPage from './EmptyProject';

// component styles
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


const Dashboard = (props) => {
  const {
    // store props
    projects,
    branchesData,
    // functions
    createNewProject,
    handleDrawer,
    handleProjectDialog,
    handleTokenDialog,
    selectBranch,
  } = props;

  const { drawerIsOpen, projectDialogIsOpen, tokenDialogIsOpen, data } = projects;
  const { activeBranchData, sampleGraph, branches } = branchesData;

  return (
    <div style={styles.dashboardStyle} >
      <Header
        handleDrawer={handleDrawer}
        branches={branches}
        selectBranch={selectBranch}
      />
      <DrawerMenu
        drawerState={drawerIsOpen}
        handleDialog={handleProjectDialog}
        projects={data}
      />
      <CreateDialog
        dialogState={projectDialogIsOpen}
        controlDialog={handleProjectDialog}
        createNewProject={createNewProject}
      />
      <TokenDialog
        dialogState={tokenDialogIsOpen}
        controlDialog={handleTokenDialog}
      />
      {(data.length === 0) ?
        <EmptyProjectPage /> :
        <div style={styles.chartStyle}>
          <LineChart
            activeBranchData={activeBranchData}
            sampleData={sampleGraph}
          />
        </div>
      }
    </div>
  );
};


Dashboard.propTypes = {
  projects: PropTypes.object.isRequired,
  branchesData: PropTypes.object,
  createNewProject: PropTypes.func.isRequired,
  handleDrawer: PropTypes.func.isRequired,
  handleProjectDialog: PropTypes.func.isRequired,
  handleTokenDialog: PropTypes.func,
  selectBranch: PropTypes.func.isRequired,
};

export default Dashboard;
