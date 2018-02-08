import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import { transparent } from 'material-ui/styles/colors';
import Search from 'material-ui/svg-icons/action/search';


const styles = {
  appBar: {
    position: 'fixed !important',
    top: 0,
    overflow: 'hidden',
    maxHeight: 63,
    border: transparent,
    backgroundColor: transparent,
  },
  appBarTitle: {
    color: '#394f59',
    fontFamily: 'Roboto Condensed',
    fontWeight: 700,
    fontSize: 30,
  },
  menuButton: {
    marginLeft: 10,
  },
  menuItemsStyle: {
    color: '#394f59',
    fontFamily: 'Roboto Condensed',
    paddingTop: 12,
  },
  toolbarTitle: {
    color: '#394f59',
    fontFamily: 'Roboto Condensed',
    fontSize: 19,
    paddingRight: 0,
  },
  addingColor: {
    color: '#394f59',
  },
  autocompleteToolGroup: {
    width: '60%',
    paddingRight: 0,
    marginRight: 0,
  },
  autocompleteStyle: {
    paddingLeft: 10,
    marginBottom: 0,
  },
  dropdownMenu: {
    maxHeight: 315,
    overflow: 'auto',
    color: '#394f59',
  },
  searchBranchTitle: {
    fontFamily: 'Roboto Condensed',
    fontSize: 19,
    color: '#394f59',
  },
  searchIcon: {
    marginTop: 16,
    height: 22,
    width: 22,
  },
};


// Main Component
const Header = (props) => {
  const { handleDrawer, branches, selectBranch } = props;

  // helper Function
  const createMenuItems = (branchesList) => {
    return branchesList.map((name) => {
      return {
        text: `Branch ${name}`,
        value: (
          <MenuItem
            style={styles.menuItemsStyle}
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
        titleStyle={styles.appBarTitle}
        style={styles.appBar}
        iconElementLeft={
          <IconButton style={styles.menuButton} onClick={handleDrawer}>
            <Menu color={'#394f59'} />
          </IconButton>
        }
        iconElementRight={
          <Toolbar style={{ backgroundColor: transparent }}>
            <ToolbarGroup>
              <ToolbarTitle text={'Project1'} style={styles.toolbarTitle} />
            </ToolbarGroup>
            <ToolbarSeparator style={{ marginLeft: 15 }} />
            <ToolbarGroup style={styles.autocompleteToolGroup} >
              <AutoComplete
                hintText="Select a Branch..."
                dataSource={createMenuItems(branches)}
                filter={AutoComplete.fuzzyFilter}
                openOnFocus={true} // eslint-disable-line
                fullWidth={true} // eslint-disable-line
                style={styles.autocompleteStyle}
                listStyle={styles.dropdownMenu}
                hintStyle={styles.addingColor}
                textFieldStyle={styles.searchBranchTitle}
                inputStyle={styles.addingColor}
              />
            </ToolbarGroup>
            <Search color={'#394f59'} style={styles.searchIcon} />
          </Toolbar>
        }
      />
    </div>
  );
};

Header.propTypes = {
  branches: PropTypes.array,
  handleDrawer: PropTypes.func,
  selectBranch: PropTypes.func,
};

export default Header;
