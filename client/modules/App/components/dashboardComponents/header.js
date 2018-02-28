import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import AutoComplete from 'material-ui/AutoComplete';
import { transparent } from 'material-ui/styles/colors';
import Search from 'material-ui/svg-icons/action/search';
import { controlDrawer } from '../actions/ProjectActions';
import { fetchBranchCommits, searchingBranch } from '../actions/BranchActions';


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
  const { listBranches, activeProject, searchingBranchInput, dispatch } = props;

  const handleDrawer = () => dispatch(controlDrawer());

  const selectBranch = (name) => dispatch(fetchBranchCommits(activeProject.projectId, name));

  const searching = (value) => dispatch(searchingBranch(value));


  return (
    <div>
      <AppBar
        title="Code Quality"
        titleStyle={styles.appBarTitle}
        style={styles.appBar}
        iconElementLeft={
          <IconButton onClick={handleDrawer}>
            <Menu color={'#394f59'} />
          </IconButton>
        }
        iconElementRight={
          <Toolbar style={{ backgroundColor: transparent }}>
            <ToolbarGroup>
              <ToolbarTitle text={activeProject.name} style={styles.toolbarTitle} />
            </ToolbarGroup>
            <ToolbarSeparator style={{ marginLeft: 15 }} />
            <ToolbarGroup style={styles.autocompleteToolGroup} >
              {
                (listBranches.length === 0) ?
                  <TextField
                    hintText="Select a Branch..."
                    fullWidth={true} // eslint-disable-line
                    hintStyle={styles.searchBranchTitle}
                    style={styles.autocompleteStyle}
                  /> :
                  <AutoComplete
                    hintText="Select a Branch..."
                    searchText={searchingBranchInput}
                    dataSource={listBranches}
                    filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                    onUpdateInput={searching}
                    onNewRequest={selectBranch}
                    openOnFocus={true} // eslint-disable-line
                    fullWidth={true} // eslint-disable-line
                    style={styles.autocompleteStyle}
                    listStyle={styles.dropdownMenu}
                    hintStyle={styles.addingColor}
                    textFieldStyle={styles.searchBranchTitle}
                    inputStyle={styles.addingColor}
                  />
              }
            </ToolbarGroup>
            <Search color={'#394f59'} style={styles.searchIcon} />
          </Toolbar>
        }
      />
    </div>
  );
};

Header.propTypes = {
  dispatch: PropTypes.func,
  listBranches: PropTypes.array,
  activeProject: PropTypes.object,
  searchingBranchInput: PropTypes.string,
};


function mapStateToProps(store) {
  return {
    activeProject: store.projects.activeProject,
    listBranches: store.branches.branches,
    searchingBranchInput: store.branches.searchingBranchInput,
  };
}

export default connect(mapStateToProps)(Header);
