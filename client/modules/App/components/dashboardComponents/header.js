import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import { transparent } from 'material-ui/styles/colors';
import Search from 'material-ui/svg-icons/action/search';


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


// Main Component
const Header = (props) => {
  const { styles, handleDrawer, branches, selectBranch } = props;

  // helper Function
  const createMenuItems = (branchesList) => {
    return branchesList.map((name) => {
      return {
        text: `Branch ${name}`,
        value: (
          <MenuItem
            style={{ fontFamily: 'Acme', color: '#394f59' }}
            key={name}
            primaryText={name}
            onClick={() => selectBranch(name)}
          />
        ),
      };
    });
  };

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
              <ToolbarTitle text={'Project1'} style={{ color: '#394f59', fontFamily: 'Acme', fontSize: 19, paddingRight: 0 }} />
            </ToolbarGroup>
            <ToolbarSeparator style={{ marginLeft: 15 }} />
            <ToolbarGroup style={{ width: '60%', paddingRight: 0, marginRight: 0 }} >
              <AutoComplete
                hintText="Select a Branch..."
                dataSource={createMenuItems(branches)}
                filter={AutoComplete.fuzzyFilter}
                openOnFocus={true} // eslint-disable-line
                fullWidth={true} // eslint-disable-line
                style={{ paddingLeft: 10, marginBottom: 0 }}
                listStyle={{ maxHeight: 315, overflow: 'auto', color: '#394f59' }}
                hintStyle={{ color: '#394f59' }}
                textFieldStyle={{ fontFamily: 'Acme', fontSize: 18, color: '#394f59' }}
                inputStyle={{ color: '#394f59' }}
              />
            </ToolbarGroup>
            <Search color={'#394f59'} style={{ marginTop: 16, height: 22, width: 22 }} />
          </Toolbar>
        }
      />
    </div>
  );
};

Header.propTypes = {
  styles: PropTypes.object,
  handleDrawer: PropTypes.func,
  branches: PropTypes.array,
  selectBranch: PropTypes.func,
};

export default Header;
