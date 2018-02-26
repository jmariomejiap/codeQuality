import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { spacing } from 'material-ui/styles';
import { transparent } from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';
import Add from 'material-ui/svg-icons/content/add';
import Menu from 'material-ui/svg-icons/navigation/apps';
import { controlProjectDialog, selectProject } from '../actions/ProjectActions';
import { fetchBranches, resetBranchDuration, setNextAction } from '../actions/BranchActions';

const styles = {
  logo: {
    fontSize: 20,
    color: '#394f59',
    fontFamily: 'Roboto Condensed',
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    backgroundColor: transparent,
    paddingLeft: 20,
    height: 63,
  },
  menuItem: {
    fontSize: 14,
    fontFamily: 'Roboto Condensed',
    color: '#394f59',
  },
  drawer: {
    backgroundColor: transparent,
    marginTop: 63,
  },
  list: {
    fontSize: 12,
    fontFamily: 'Roboto Condensed',
    color: '#394f59',
  },
  nestedList: {
    maxHeight: 535,
    overflow: 'auto',
  },
};


const DrawerMenu = (props) => {
  const { drawerState, projectNames, projectsData, dispatch } = props;

  const findBranches = (projectName) => {
    const project = projectsData.filter((obj) => projectName === obj.name);
    dispatch(fetchBranches(project[0]._id))
      .then(() => dispatch(setNextAction('fetchCommits')));
  };

  const openCreateDialog = () => {
    dispatch(controlProjectDialog());
  };

  const chooseProject = (name) => {
    dispatch(selectProject(name));
    dispatch(resetBranchDuration());
    findBranches(name);
  };

  const listOfProjects = () => {
    return projectNames.map((name) => {
      return <ListItem key={name} style={styles.list} primaryText={name} onClick={() => chooseProject(name)} />;
    });
  };


  return (
    <div>
      <Drawer
        width="13%"
        containerStyle={styles.drawer}
        open={drawerState}
        overlayStyle={{ backgroundColor: transparent }}
      >
        <div style={styles.logo}>Menu</div>
        <List>
          <ListItem
            primaryText="Projects"
            primaryTogglesNestedList={true} // eslint-disable-line react/jsx-boolean-value
            style={styles.menuItem}
            nestedListStyle={styles.nestedList}
            nestedItems={listOfProjects()}
            leftIcon={<Menu color={'#394f59'} />}
          />
        </List>
        <Divider />
        <div >
          <List>
            <ListItem
              primaryText="Create Project"
              leftIcon={<Add color={'#394f59'} />}
              style={styles.menuItem}
              onClick={openCreateDialog}
            />
          </List>
        </div>
      </Drawer>
    </div>
  );
};

DrawerMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  drawerState: PropTypes.bool.isRequired,
  projectNames: PropTypes.aray,
  projectsData: PropTypes.array,
};

function mapStateToProps(store) {
  return {
    drawerState: store.projects.drawerIsOpen,
    projectNames: store.projects.projectsName,
    projectsData: store.projects.projectsData,
  };
}

export default connect(mapStateToProps)(DrawerMenu);
