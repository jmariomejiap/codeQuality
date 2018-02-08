export const BRANCH_SELECTED = 'BRANCH_SELECTED';

export function branchSelector(name) {
  return {
    type: BRANCH_SELECTED,
    payload: name,
  };
}
