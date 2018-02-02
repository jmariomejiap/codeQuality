import React, { PropTypes } from 'react';
import CreateDialog from './components/dashboardComponents/createProjectDialog';
import Header from './components/dashboardComponents/header';
import DrawerMenu from './components/dashboardComponents/drawerMenu';
import LineChart from './components/dashboardComponents/lineChart';
import BarChart from './components/dashboardComponents/barChart';
import DoughnutChart from './components/dashboardComponents/doughnutChart';
import { grey900, white } from 'material-ui/styles/colors';


const Dashboard = (props) => {
  const {
    projects,
    handleDrawer,
    handleDialog,
    branches,
    pickBranch,
    activeBranch,
    createNewProject,
    doughnutGraph,
    barGraph,
    sampleGraph,
  } = props;

  const { drawerIsOpen, projectDialogIsOpen, data } = projects;

  const styles = {
    header: {
      paddingLeft: drawerIsOpen ? 260 : 0,
    },
    container: {
      margin: '60px 0px 10px 0px',
      paddingLeft: drawerIsOpen ? 0 : 0,
    },
  };

  return (
    <div style={{ height: '100%' }}>
      <Header
        styles={styles.header}
        handleDrawer={handleDrawer}
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
      <div style={styles.container}>
        <LineChart
          branches={branches}
          selectBranch={pickBranch}
          activeBranch={activeBranch}
          sampleData={sampleGraph}
        />
        <DoughnutChart doughnutGraph={doughnutGraph} />
        <BarChart barGraph={barGraph} />
      </div>
      <div style={{ backgroundColor: grey900, height: 70, textAlign: 'center' }}>
        <p style={{ paddingTop: 20, color: white }}>Code Quality 2018.</p>
      </div>
    </div>
  );
};


Dashboard.propTypes = {
  activeBranch: PropTypes.array,
  branches: PropTypes.array,
  doughnutGraph: PropTypes.object,
  barGraph: PropTypes.object,
  sampleGraph: PropTypes.object,
  projects: PropTypes.object.isRequired,
  pickBranch: PropTypes.func.isRequired,
  createNewProject: PropTypes.func.isRequired,
  handleDialog: PropTypes.func.isRequired,
  handleDrawer: PropTypes.func.isRequired,
};

export default Dashboard;
