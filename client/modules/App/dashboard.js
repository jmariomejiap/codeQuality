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
    // functions
  } = props;

  const { projectsName } = projects;

  return (
    <div style={styles.dashboardStyle} >
      <Header />
      <DrawerMenu />
      <CreateDialog />
      <TokenDialog />
      {(projectsName.length === 0) ?
        <EmptyProjectPage /> :
        <div style={styles.chartStyle}>
          <LineChart />
        </div>
      }
    </div>
  );
};


Dashboard.propTypes = {
  projects: PropTypes.object.isRequired,
};

export default Dashboard;
