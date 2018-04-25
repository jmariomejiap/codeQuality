import _ from 'lodash';
import {
  RECEIVED_TOKEN,
  FETCHED_PROJECTS,
  DRAWER_EVENT,
  PROJECT_DIALOG_EVENT,
  TOKEN_DIALOG_EVENT,
  PROJECT_SELECTED,
  UPDATE_NEXT_ACTION,
  CREATE_PROJECT_INPUT,
  CLEAR_PROJECT_INPUT,
  EMPTY_PROJECTS,
} from '../actions/ProjectActions';


const initialState = {
  projectsName: [],
  projectsData: [],
  drawerIsOpen: false,
  projectDialogIsOpen: false,
  tokenDialogIsOpen: false,
  tokenData: [],
  activeProject: { name: '', token: '', projectId: '' },
  projectInputValue: '',
  noProjectsFound: false,
};


const createProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_PROJECTS :
      return {
        ...state,
        projectsName: _.union(state.projectsName, action.listProjects),
        projectsData: _.unionWith(state.projectsData, action.fullResponse, _.isEqual),
      };


    case EMPTY_PROJECTS:
      return {
        ...state,
        noProjectsFound: true,
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


    case UPDATE_NEXT_ACTION :
      return {
        ...state,
        nextAction: action.name,
      };


    case DRAWER_EVENT :
      return {
        ...state,
        drawerIsOpen: !state.drawerIsOpen,
      };


    case CREATE_PROJECT_INPUT :
      return {
        ...state,
        projectInputValue: action.value,
      };


    case CLEAR_PROJECT_INPUT :
      return {
        ...state,
        projectInputValue: '',
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
