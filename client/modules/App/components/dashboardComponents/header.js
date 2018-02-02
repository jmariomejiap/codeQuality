import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/svg-icons/navigation/menu';
import Settings from 'material-ui/svg-icons/action/settings';
import { grey900, transparent } from 'material-ui/styles/colors';

const style = {
  appBar: {
    position: 'fixed !important',
    top: 0,
    overflow: 'hidden',
    maxHeight: 63,
    border: transparent,
    backgroundColor: transparent,
  },
  menuButton: {
    marginLeft: 10,
  },
  iconsRightContainer: {
    marginRight: 20,
  },
  labels: {
    paddingTop: 15,

  },
};

const Header = (props) => {
  const { styles, handleDrawer } = props;

  return (
    <div>
      <AppBar
        title="Code Quality"
        titleStyle={{ color: '#394f59', fontFamily: 'Bangers', fontSize: 30 }}
        style={{ ...styles, ...style.appBar }}
        iconElementLeft={
          <IconButton style={style.menuButton} onClick={handleDrawer}>
            <Menu color={grey900} />
          </IconButton>
        }
        iconElementRight={
          <div style={style.iconsRightContainer}>
            <IconMenu
              color={grey900}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              iconButtonElement={
                <IconButton>
                  <Settings color={grey900} />
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
