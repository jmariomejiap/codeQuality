import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import CreateDialog from './modules/App/components/createProjectDialog';
import NewHeader from './modules/App/components/newHeader';
import DrawerMenu from './modules/App/components/drawerMenu';
import DashboardContainers from './modules/App/components/containers';


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
          <DashboardContainers />
        </div>
      </div>
    );
  }
}

export default Dashboard;
