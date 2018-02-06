export const BRANCH_SELECTED = 'BRANCH_SELECTED';
export const BRANCH_DIALOG_EVENT = 'BRANCH_DIALOG_EVENT';

export function selectBranch(name) {
  return {
    type: BRANCH_SELECTED,
    payload: name,
  };
}

export function controlBranchDialog() {
  return {
    type: BRANCH_DIALOG_EVENT,
  };
}
