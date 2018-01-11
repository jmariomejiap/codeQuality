// Export Constant
export const ADD_PROJECT = 'ADD_PROJECT';
export const DRAWER_EVENT = 'DRAWER_EVENT';
export const DIALOG_EVENT = 'DIALOG_EVENT';

export function createProject(name) {
  return {
    type: ADD_PROJECT,
    newProject: name,
  };
}

export function controlDrawer() {
  return {
    type: DRAWER_EVENT,
  };
}

export function controlDialog() {
  return {
    type: DIALOG_EVENT,
  };
}
