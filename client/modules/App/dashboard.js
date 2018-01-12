import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import CreateDialog from './components/dashboard/createProjectDialog';
import NewHeader from './components/dashboard/newHeader';
import DrawerMenu from './components/dashboard/drawerMenu';
import DashboardContainers from './components/dashboard/boxes';


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
          <CardTitle title="Dashboard" subtitle="chart below" />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          </CardText>
        </Card>
        <DashboardContainers
          branches={branches}
          escojeBranch={pickBranch}
          activeBranch={activeBranch}
        />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  activeBranch: PropTypes.string,
  branches: PropTypes.array,
  projects: PropTypes.object.isRequired,
  pickBranch: PropTypes.func.isRequired,
  createNewProject: PropTypes.func.isRequired,
  handleDialog: PropTypes.func.isRequired,
  handleDrawer: PropTypes.func.isRequired,
};

export default Dashboard;
