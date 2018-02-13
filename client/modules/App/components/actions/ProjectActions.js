import callApi from '../../../../util/apiCaller';

// Export Constant
export const ADD_PROJECT = 'ADD_PROJECT';
export const DRAWER_EVENT = 'DRAWER_EVENT';
export const PROJECT_DIALOG_EVENT = 'PROJECT_DIALOG_EVENT';
export const TOKEN_DIALOG_EVENT = 'TOKEN_DIALOG_EVENT';
export const RECEIVED_TOKEN = 'RECEIVED_TOKEN';
export const FETCHED_PROJECTS = 'FETCHED_PROJECTS';
export const PROJECT_SELECTED = 'PROJECT_SELECTED';
export const UPDATE_NEXT_ACTION = 'UPDATE_NEXT_ACTION';
export const PROJECT_DURATION = 'PROJECT_DURATION';

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


export function createProject(name) {
  return {
    type: ADD_PROJECT,
    newProject: name,
  };
}

export function selectProject(name) {
  return {
    type: PROJECT_SELECTED,
    name,
  };
}

export function findProjectDuration(duration) {
  return {
    type: PROJECT_DURATION,
    duration,
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
    return callApi('v1/project').then(res => {
      const listProjects = res.projects.map((projectObject) => projectObject.name);
      dispatch(updateProjectList(listProjects, res.projects));
    });
  };
}


export function receivedToken(tokenMessage) {
  return {
    type: RECEIVED_TOKEN,
    tokenMessage,
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
