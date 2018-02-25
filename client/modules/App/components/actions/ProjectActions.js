import callApi from '../../../../util/apiCaller';

// Export Constant
export const DRAWER_EVENT = 'DRAWER_EVENT';
export const PROJECT_DIALOG_EVENT = 'PROJECT_DIALOG_EVENT';
export const TOKEN_DIALOG_EVENT = 'TOKEN_DIALOG_EVENT';
export const RECEIVED_TOKEN = 'RECEIVED_TOKEN';
export const FETCHED_PROJECTS = 'FETCHED_PROJECTS';
export const PROJECT_SELECTED = 'PROJECT_SELECTED';
export const UPDATE_NEXT_ACTION = 'UPDATE_NEXT_ACTION';
export const CREATE_PROJECT_INPUT = 'CREATE_PROJECT_INPUT';
export const CLEAR_PROJECT_INPUT = 'CLEAR_PROJECT_INPUT';


export function controlTokenDialog() {
  return {
    type: TOKEN_DIALOG_EVENT,
  };
}


export function controlDrawer() {
  return {
    type: DRAWER_EVENT,
  };
}


export function controlProjectDialog() {
  return {
    type: PROJECT_DIALOG_EVENT,
  };
}


export function selectProject(name) {
  return {
    type: PROJECT_SELECTED,
    name,
  };
}


export function updateProjectList(listProjects, fullResponse) {
  return {
    type: FETCHED_PROJECTS,
    listProjects,
    fullResponse,
  };
}


export function fetchProjects() {
  return (dispatch) => {
    return callApi('v1/project')
      .then(res => {
        const listProjects = res.projects;
        const listProjectNames = listProjects.map((projectObject) => projectObject.name);
        const nameLastActiveProject = listProjectNames[0];

        dispatch(updateProjectList(listProjectNames, listProjects));
        dispatch(selectProject(nameLastActiveProject));
      });
  };
}


export function receivedToken(tokenMessage) {
  return {
    type: RECEIVED_TOKEN,
    tokenMessage,
  };
}


export function updateCreateProjectInput(value) {
  return {
    type: CREATE_PROJECT_INPUT,
    value,
  };
}


export function clearCreateProjectInput() {
  return {
    type: CLEAR_PROJECT_INPUT,
  };
}


export function createProjectApi(name) {
  const body = { projectName: name };
  return (dispatch) => {
    return callApi('v1/project', 'post', body).then(res => {
      dispatch(receivedToken(res));
      dispatch(controlTokenDialog());
      dispatch(fetchProjects());
    });
  };
}


export function updateNextAction(name) {
  return {
    type: UPDATE_NEXT_ACTION,
    name,
  };
}
