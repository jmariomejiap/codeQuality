import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import CreateDialog from './components/dashboard/createProjectDialog';
import NewHeader from './components/dashboard/newHeader';
import DrawerMenu from './components/dashboard/drawerMenu';
import DashboardContainers from './components/dashboard/boxes';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
    this.handleDrawerState = this.handleDrawerState.bind(this);
  }

  handleDrawerState() {
    this.props.handleDrawer();
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }

  render() {
    const styles = {
      header: {
        paddingLeft: this.state.drawerOpen ? 260 : 0,
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: this.state.drawerOpen ? 260 : 0,
      },
    };

    return (
      <div>
        <NewHeader
          styles={styles.header}
          handleDrawer={this.handleDrawerState}
        />
        <DrawerMenu
          drawerState={this.props.projects.drawerIsOpen}
          handleDialog={this.props.handleDialog}
          projects={this.props.projects}
        />
        <CreateDialog
          dialogState={this.props.projects.projectDialogIsOpen}
          controlDialog={this.props.handleDialog}
          createNewProject={this.props.createNewProject}
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
            branches={this.props.branches}
            escojeBranch={this.props.pickBranch}
            activeBranch={this.props.activeBranch}
          />
        </div>
      </div>
    );
  }
}

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
