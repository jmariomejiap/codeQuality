import { ADD_PROJECT, DRAWER_EVENT, PROJECT_DIALOG_EVENT, TOKEN_DIALOG_EVENT } from '../actions/ProjectActions';

const initialState = {
  data: ['projectMatrix', 'projectFindNemo', 'projectFindDory', 'projectSaveWilly'],
  drawerIsOpen: false,
  projectDialogIsOpen: false,
  tokenDialogIsOpen: false,
};

const createProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT :
      return {
        ...state,
        data: [action.newProject, ...state.data],
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
