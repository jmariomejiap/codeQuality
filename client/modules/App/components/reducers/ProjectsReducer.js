import _ from 'lodash';
import {
  RECEIVED_TOKEN,
  FETCHED_PROJECTS,
  DRAWER_EVENT,
  PROJECT_DIALOG_EVENT,
  TOKEN_DIALOG_EVENT,
  PROJECT_SELECTED,
} from '../actions/ProjectActions';


const initialState = {
  projectsName: [],
  projectsData: [],
  drawerIsOpen: false,
  projectDialogIsOpen: false,
  tokenDialogIsOpen: false,
  tokenData: [],
  activeProject: { name: '', token: '', projectId: '' },
};


const createProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_PROJECTS :
      return {
        ...state,
        projectsName: _.union(state.projectsName, action.listProjects),
        projectsData: _.unionWith(state.projectsData, action.fullResponse, _.isEqual),
      };

    case RECEIVED_TOKEN :
      return {
        ...state,
        tokenData: [action.tokenMessage],
      };

    case PROJECT_SELECTED : // eslint-disable-line
      const selectedProject = state.projectsData.filter((obj) => obj.name === action.name);

      return {
        ...state,
        activeProject: { name: selectedProject[0].name, token: selectedProject[0].token, projectId: selectedProject[0]._id },
      };

    case DRAWER_EVENT :
      return {
        ...state,
        drawerIsOpen: !state.drawerIsOpen,
      };

    case PROJECT_DIALOG_EVENT :
      return {
        ...state,
        projectDialogIsOpen: !state.projectDialogIsOpen,
      };

    case TOKEN_DIALOG_EVENT :
      return {
        ...state,
        tokenDialogIsOpen: !state.tokenDialogIsOpen,
      };

    default:
      return state;
  }
};

export default createProjectReducer;
