import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import { transparent } from 'material-ui/styles/colors';

import FlatButton from 'material-ui/FlatButton';
import CallSplit from 'material-ui/svg-icons/communication/call-split';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';


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
    position: 'absolute',
  },
  labels: {
    paddingTop: 15,

  },
};


const Header = (props) => {
  const { styles, handleDrawer, handleBranchDialog, currentBranch } = props;

  return (
    <div>
      <AppBar
        title="Code Quality"
        titleStyle={{ color: '#394f59', fontFamily: 'Bangers', fontSize: 30 }}
        style={{ ...styles, ...style.appBar }}
        iconElementLeft={
          <IconButton style={style.menuButton} onClick={handleDrawer}>
            <Menu color={'#394f59'} />
          </IconButton>
        }
        iconElementRight={
          <Toolbar style={{ backgroundColor: transparent }}>
            <ToolbarGroup>
              <ToolbarTitle text={'Project1'} style={{ color: '#394f59', fontFamily: 'Acme', fontSize: 19 }} />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup>
              <FlatButton
                label={`Branch ${currentBranch}`}
                labelStyle={{ fontFamily: 'Acme', color: '#394f59', fontSize: 19, textTransform: 'none' }}
                icon={<CallSplit color={'#394f59'} />}
                hoverColor={transparent}
                labelPosition="after"
                style={{ marginTop: 0 }}
                onClick={handleBranchDialog}
              />
            </ToolbarGroup>
          </Toolbar>
        }
      />
    </div>
  );
};

Header.propTypes = {
  styles: PropTypes.object,
  handleDrawer: PropTypes.func,
  handleBranchDialog: PropTypes.func,
  currentBranch: PropTypes.string,
};

export default Header;
