import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { spacing } from 'material-ui/styles';
import { white, grey900, grey700, black, grey300 } from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';
import Add from 'material-ui/svg-icons/content/add';
import Menu from 'material-ui/svg-icons/navigation/apps';

const styles = {
  logo: {
    fontSize: 20,
    color: white,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    backgroundColor: grey900,
    paddingLeft: 40,
    height: 63,
  },
  menuItem: {
    color: white,
    fontSize: 14,
  },
  drawer: {
    backgroundColor: grey700,
  },
  list: {
    color: grey300,
    fontSize: 12,
  },
};

const DrawerMenu = (props) => {
  const { drawerState, handleDialog, projects } = props;

  const listOfProjects = () => {
    return projects.map((name) => {
      return <ListItem key={name} style={styles.list} primaryText={name} />;
    });
  };

  return (
    <div>
      <Drawer
        containerStyle={styles.drawer}
        open={drawerState}
      >
        <div style={styles.logo}>Menu</div>
        <List>
          <ListItem
            primaryText="Projects"
            primaryTogglesNestedList={true} // eslint-disable-line react/jsx-boolean-value
            style={styles.menuItem}
            nestedItems={listOfProjects()}
            leftIcon={<Menu color={black} />}
          />
        </List>
        <Divider />
        <div >
          <List>
            <ListItem
              primaryText="Create Project"
              leftIcon={<Add color={black} />}
              style={styles.menuItem}
              onClick={handleDialog}
            />
          </List>
        </div>
      </Drawer>
    </div>
  );
};

DrawerMenu.propTypes = {
  drawerState: PropTypes.bool.isRequired,
  handleDialog: PropTypes.func.isRequired,
  projects: PropTypes.aray,
};

export default DrawerMenu;
