import { ADD_PROJECT, DRAWER_EVENT, DIALOG_EVENT } from '../actions/ProjectActions';

const initialState = {
  data: ['projectMatrix', 'projectFindNemo', 'projectFindDory', 'projectSaveWilly'],
  drawerIsOpen: false,
  projectDialogIsOpen: false,
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

    case DIALOG_EVENT :
      return {
        ...state,
        projectDialogIsOpen: !state.projectDialogIsOpen,
      };

    default:
      return state;
  }
};

export default createProjectReducer;
