import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { spacing } from 'material-ui/styles';
import { transparent, grey700, grey800 } from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';
import Add from 'material-ui/svg-icons/content/add';
import Menu from 'material-ui/svg-icons/navigation/apps';

const styles = {
  logo: {
    fontSize: 20,
    color: '#394f59',
    fontFamily: 'Acme',
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    backgroundColor: transparent,
    paddingLeft: 40,
    height: 63,
  },
  menuItem: {
    fontSize: 14,
  },
  drawer: {
    backgroundColor: transparent, // '#c14f4f',
  },
  list: {
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
        width="15%"
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
            leftIcon={<Menu color={grey800} />}
          />
        </List>
        <Divider />
        <div >
          <List>
            <ListItem
              primaryText="Create Project"
              leftIcon={<Add color={grey700} />}
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
