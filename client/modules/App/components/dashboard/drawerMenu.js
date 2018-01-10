import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { spacing, typography } from 'material-ui/styles';
import { white, grey900, grey700, black, grey300 } from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';
// import {Link} from 'react-router';
// import Avatar from 'material-ui/Avatar';
import Add from 'material-ui/svg-icons/content/add';
import Menu from 'material-ui/svg-icons/navigation/apps';


const DrawerMenu = (props) => {
  let { drawerState, handleDialog } = props;

  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 20,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
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

  return (
    <div>
      <Drawer
        containerStyle={styles.drawer}
        open={drawerState}
      >
        <div style={styles.logo}>
          Menu
        </div>
        <List>
          <ListItem
            primaryText="Projects"
            primaryTogglesNestedList={true} // eslint-disable-line react/jsx-boolean-value
            style={styles.menuItem}
            nestedItems={[
              <ListItem style={styles.list} primaryText="project_saveTheWorld" />,
              <ListItem style={styles.list} primaryText="project_elmo" />,
              <ListItem style={styles.list} primaryText="project_learningToCode" />,
              <ListItem style={styles.list} primaryText="project_codeQuality" />,
            ]}
            leftIcon={<Menu color={black} />}
            /* containerElement={<Link to={menu.link}/>} */
          />
        </List>
        <Divider />
        <div >
          <List>
            <ListItem primaryText="Create Project" leftIcon={<Add color={black} />} style={styles.menuItem} onClick={handleDialog} />
          </List>
        </div>
      </Drawer>
    </div>
  );
};

DrawerMenu.propTypes = {
  drawerState: PropTypes.bool,
  handleDialog: PropTypes.func,
};

export default DrawerMenu;
