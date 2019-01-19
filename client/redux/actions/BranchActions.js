import moment from 'moment';
import callApi from '../../util/apiCaller';
export const BRANCH_SELECTED = 'BRANCH_SELECTED';
export const FETCHED_BRANCHES = 'FETCHED_BRANCHES';
export const DURATION_DAYS = 'DURATION_DAYS';
export const DURATION_WEEKS = 'DURATION_WEEKS';
//
export const SET_NEXT_ACTION = 'SET_NEXT_ACTION';
export const NO_BRANCHES = 'NO_BRANCHES';
export const RESET_BRANCH_DURATION = 'RESET_BRANCH_DURATION';
export const BRANCH_INPUT = 'BRANCH_INPUT';
export const SUBSCRIBE_SOCKET = 'SUBSCRIBE_SOCKET';
export const ADD_NEW_COMMIT = 'ADD_NEW_COMMIT';

export function subscribeSocket(socket) {
  return {
    type: SUBSCRIBE_SOCKET,
    socket
  };
}

export function addNewCommit(commitData) {
  return {
    type: ADD_NEW_COMMIT,
    commitData
  };
}

export function setNextAction(instruction) {
  return {
    type: SET_NEXT_ACTION,
    instruction
  };
}

export function activateSelectedBranch(branchName, branchData) {
  return {
    type: BRANCH_SELECTED,
    branchName,
    branchData
  };
}

export function resetBranchDuration() {
  return {
    type: RESET_BRANCH_DURATION
  };
}

export function branchDurationWeeks(weeks) {
  return {
    type: DURATION_WEEKS,
    duration: weeks
  };
}

export function branchDurationDays(days) {
  return {
    type: DURATION_DAYS,
    duration: days
  };
}

export function searchingBranch(input) {
  return {
    type: BRANCH_INPUT,
    input
  };
}

export function calculateBranchDuration(arrayCommits) {
  return dispatch => {
    const firstCommit = arrayCommits[0].commitDate;
    const lastCommit = arrayCommits[arrayCommits.length - 1].commitDate;
    const start = moment(firstCommit);
    const end = moment(lastCommit);
    const resultWeeks = end.diff(start, 'weeks');

    if (resultWeeks > 0) {
      return dispatch(branchDurationWeeks(resultWeeks));
    }

    const resultDays = end.diff(start, 'days');
    return dispatch(branchDurationDays(resultDays));
  };
}

// gets call when user clicks a specific branch.
export function fetchBranchCommits(projectId, branchName) {
  return dispatch => {
    return callApi(
      `v1/commitsHistory?projectId=${projectId}&branch=${branchName}`
    ).then(res => {
      dispatch(activateSelectedBranch(branchName, res.commitsHistory));

      dispatch(calculateBranchDuration(res.commitsHistory));
    });
  };
}

export function updateBranchList(listBranches) {
  return {
    type: FETCHED_BRANCHES,
    listBranches
  };
}

export function foundEmptyBranches() {
  return {
    type: NO_BRANCHES
  };
}

// gets call when user selects a project.
export function fetchBranches(projectId) {
  // eslint-disable-line
  return dispatch => {
    return callApi(`v1/branches?projectId=${projectId}`).then(res => {
      if (res.branches) {
        const listBranches = res.branches.map(branchObject => {
          return branchObject.name;
        });
        dispatch(updateBranchList(listBranches));
        return;
      }
      dispatch(foundEmptyBranches());
    });
  };
}
