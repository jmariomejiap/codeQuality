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
      createProjectOpen: false,
    };
    this.handleDrawer = this.handleDrawer.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }

  handleOpenDialog() {
    this.setState({
      createProjectOpen: true,
    });
  }

  handleCloseDialog() {
    this.setState({
      createProjectOpen: false,
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
        <NewHeader styles={styles.header} handleDrawer={this.handleDrawer} />
        <DrawerMenu drawerState={this.state.drawerOpen} handleDialog={this.handleOpenDialog} />
        <CreateDialog dialogState={this.state.createProjectOpen} controlDialog={this.handleCloseDialog} />
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
  branches: PropTypes.array,
  pickBranch: PropTypes.func,
  activeBranch: PropTypes.string,
};

export default Dashboard;
