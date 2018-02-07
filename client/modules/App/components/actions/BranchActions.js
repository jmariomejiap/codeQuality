export const BRANCH_SELECTED = 'BRANCH_SELECTED';
export const BRANCH_DIALOG_EVENT = 'BRANCH_DIALOG_EVENT';

export function branchSelector(name) {
  return {
    type: BRANCH_SELECTED,
    payload: name,
  };
}
