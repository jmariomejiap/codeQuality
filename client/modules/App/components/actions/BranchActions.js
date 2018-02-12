import callApi from '../../../../util/apiCaller';

export const BRANCH_SELECTED = 'BRANCH_SELECTED';
export const FETCHED_BRANCHES = 'FETCHED_BRANCHES';


export function updateSelectedBranch(branchName, branchData) {
  return {
    type: BRANCH_SELECTED,
    branchName,
    branchData,
  };
}

export function fetchBranchCommits(projectId, branchName) {
  console.log('fetchBranchCommits params = ', projectId, 'and ', branchName);
  return (dispatch) => {
    return callApi(`v1/commitsHistory?projectId=${projectId}&branch=${branchName}`).then(res => {
      console.log('fetchBranchCommits = ', res);
      dispatch(updateSelectedBranch(branchName, res.commitsHistory));
    });
  };
}

export function updateBranchList(listBranches) {
  return {
    type: FETCHED_BRANCHES,
    listBranches,
  };
}

// hardCoded to fetch dummyProject1.
export function fetchBranches(projectId) { // eslint-disable-line
  return (dispatch) => {
    console.log('fetching with projectId = ', projectId);
    return callApi(`v1/branches?projectId=${projectId}`).then(res => {
      console.log('BranchAction ...list branches = ', res);
      if (res.branches) {
        const listBranches = res.branches.map(branchObject => {
          return branchObject.name;
        });
        dispatch(updateBranchList(listBranches));
        return;
      }
      dispatch(updateBranchList([]));
    });
  };
}
