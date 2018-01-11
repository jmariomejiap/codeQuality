import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/svg-icons/navigation/menu';
import Settings from 'material-ui/svg-icons/action/settings';
import { white, grey900 } from 'material-ui/styles/colors';


const Header = (props) => {
  const { styles, handleDrawer } = props;

  const style = {
    appBar: {
      position: 'fixed',
      top: 0,
      overflow: 'hidden',
      maxHeight: 63,
      backgroundColor: grey900,
    },
    menuButton: {
      marginLeft: 10,
    },
    iconsRightContainer: {
      marginLeft: 20,
    },
    labels: {
      paddingTop: 15,

    },
  };

  return (
    <div>
      <AppBar
        title="Code Quality"
        style={{ ...styles, ...style.appBar }}
        iconElementLeft={
          <IconButton style={style.menuButton} onClick={handleDrawer}>
            <Menu color={white} />
          </IconButton>
        }
        iconElementRight={
          <div style={style.iconsRightContainer}>
            <IconMenu
              color={white}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              iconButtonElement={
                <IconButton>
                  <Settings color={white} />
                </IconButton>
              }
            >
              <MenuItem style={style.labels} primaryText="Settings" containerElement={<Link to="/settings" />} />
            </IconMenu>
          </div>
        }
      />
    </div>
  );
};

Header.propTypes = {
  styles: PropTypes.object,
  handleDrawer: PropTypes.func,
};

export default Header;
