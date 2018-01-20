import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import CreateDialog from './components/dashboardComponents/createProjectDialog';
import NewHeader from './components/dashboardComponents/newHeader';
import DrawerMenu from './components/dashboardComponents/drawerMenu';
import ChartContainer from './components/dashboardComponents/chartContainer';
import OtherContainers from './components/dashboardComponents/boxes';


const Dashboard = (props) => {
  const { projects, handleDrawer, handleDialog, branches, pickBranch, activeBranch, createNewProject } = props;
  const { drawerIsOpen, projectDialogIsOpen, data } = projects;

  const styles = {
    header: {
      paddingLeft: drawerIsOpen ? 260 : 0,
    },
    container: {
      margin: '80px 20px 20px 15px',
      paddingLeft: drawerIsOpen ? 260 : 0,
    },
  };

  return (
    <div>
      <NewHeader
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
        <Card>
          <CardTitle title="Dashboard" subtitle="subtitle" />
          <CardText>
            Code Quality is a web service to help you track your code coverage over time, and ensure that all your new code is fully covered.
          </CardText>
        </Card>
        <ChartContainer
          branches={branches}
          selectBranch={pickBranch}
          activeBranch={activeBranch}
        />
        <OtherContainers />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  activeBranch: PropTypes.array,
  branches: PropTypes.array,
  projects: PropTypes.object.isRequired,
  pickBranch: PropTypes.func.isRequired,
  createNewProject: PropTypes.func.isRequired,
  handleDialog: PropTypes.func.isRequired,
  handleDrawer: PropTypes.func.isRequired,
};

export default Dashboard;
