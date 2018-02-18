import moment from 'moment';
import callApi from '../../../../util/apiCaller';

export const BRANCH_SELECTED = 'BRANCH_SELECTED';
export const FETCHED_BRANCHES = 'FETCHED_BRANCHES';
export const BRANCH_DURATION = 'BRANCH_DURATION';


export function updateSelectedBranch(branchName, branchData) {
  return {
    type: BRANCH_SELECTED,
    branchName,
    branchData,
  };
}

export function findBranchDuration(duration) {
  return {
    type: BRANCH_DURATION,
    duration,
  };
}


// gets call when user clicks a specific branch.
export function fetchBranchCommits(projectId, branchName) {
  return (dispatch) => {
    return callApi(`v1/commitsHistory?projectId=${projectId}&branch=${branchName}`).then(res => {
      dispatch(updateSelectedBranch(branchName, res.commitsHistory));

      const firstCommit = res.commitsHistory[0].commitDate;
      const lastCommit = res.commitsHistory[res.commitsHistory.length - 1].commitDate;
      const start = moment(firstCommit);
      const end = moment(lastCommit);
      const result = end.diff(start, 'weeks');
      dispatch(findBranchDuration(result));
    });
  };
}


export function updateBranchList(listBranches) {
  return {
    type: FETCHED_BRANCHES,
    listBranches,
  };
}

// gets call when user selects a project.
export function fetchBranches(projectId) { // eslint-disable-line
  return (dispatch) => {
    return callApi(`v1/branches?projectId=${projectId}`).then(res => {
      if (res.branches) {
        const listBranches = res.branches.map(branchObject => {
          return branchObject.name;
        });
        dispatch(updateBranchList(listBranches));
        return;
      }
      dispatch(updateBranchList([]));
      dispatch(updateSelectedBranch(undefined, []));
    });
  };
}
