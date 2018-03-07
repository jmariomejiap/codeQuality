import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { transparent, grey900, grey800 } from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';
import Add from 'material-ui/svg-icons/content/add';
import Menu from 'material-ui/svg-icons/navigation/apps';
import { controlProjectDialog, selectProject } from '../actions/ProjectActions';
import { fetchBranches, resetBranchDuration, setNextAction, foundEmptyBranches } from '../actions/BranchActions';

const styles = {
  logo: {
    fontSize: 20,
    color: grey900,
    fontFamily: 'Roboto Condensed',
    // lineHeight: `${spacing.desktopKeylineIncrement}px`,
    // backgroundColor: transparent,
    paddingLeft: 20,
    height: 63,
  },
  menuItem: {
    fontSize: 15,
    fontFamily: 'Roboto Condensed',
    color: grey900,
    // cursor: 'none',
  },
  drawer: {
    // backgroundColor: transparent,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 63,
  },
  list: {
    fontSize: 14,
    paddingLeft: 25,
    fontFamily: 'Roboto Condensed',
    // color: '#394f59',
    color: grey800,
  },
  listContainer: {
    maxHeight: 535,
    overflow: 'auto',
  },
  divPosition: {
    display: 'inline-block',
    height: 30
  },
  projectTitle: {
    verticalAlign: 'top',
    width: 80,
    marginLeft: 30,
    marginBottom: 5,
    cursor: 'default',
  },
};


const DrawerMenu = (props) => {
  const { drawerState, projectNames, projectsData, activeProject, dispatch } = props;

  const findBranches = (projectName) => {
    const project = projectsData.filter((obj) => projectName === obj.name);
    dispatch(fetchBranches(project[0]._id))
      .then(() => dispatch(setNextAction('fetchCommits')));
  };

  const openCreateDialog = () => {
    dispatch(controlProjectDialog());
  };

  const chooseProject = (name) => {
    if (activeProject.name === name) {
      return;
    }
    dispatch(foundEmptyBranches());
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
        <div >
          <div style={{ ...styles.divPosition, marginLeft: 15 }}>
            <Menu color={grey900} />
          </div>
          <div style={{ ...styles.divPosition, ...styles.projectTitle }}>
            <p style={{ ...styles.menuItem, paddingTop: 6 }}>Projects</p>
          </div>
        </div>
        <List style={styles.listContainer}>
          {listOfProjects()}
        </List>
        <Divider />
        <div >
          <List>
            <ListItem
              primaryText="Create Project"
              leftIcon={<Add color={grey900} />}
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
  activeProject: PropTypes.object,
};

function mapStateToProps(store) {
  return {
    drawerState: store.projects.drawerIsOpen,
    projectNames: store.projects.projectsName,
    projectsData: store.projects.projectsData,
    activeProject: store.projects.activeProject,
  };
}

export default connect(mapStateToProps)(DrawerMenu);
