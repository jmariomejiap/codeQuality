import _ from 'lodash';
import { lineGraphSample } from '../data/sample';
import { BRANCH_SELECTED, FETCHED_BRANCHES } from '../actions/BranchActions';

const initialState = {
  // branches: ['master', 'develop', 'feature1', 'feature2', 'feature3', 'feature4'],
  branches: [],
  // commitHistory: data, hardCoded data.
  commitHistory: [],
  sampleGraph: lineGraphSample,
  activeBranchData: [],
  currentBranch: '',
};

/*
// helper function.
const filterData = (state, branchName) => {
  if (branchName === 'feature4') {
    return state.commitHistory;
  }
  const filtered = state.commitHistory.filter((commitObject) => commitObject.branch === branchName);
  return filtered;
};
*/

const branchReducer = (state = initialState, action) => {
  switch (action.type) {
    case BRANCH_SELECTED:
      return {
        ...state,
        currentBranch: action.branchName,
        // activeBranchData: filterData(state, action.branchName),
        activeBranchData: action.branchData,
        commitHistory: action.branchData,
      };

    case FETCHED_BRANCHES:
      return {
        ...state,
        // branches: _.union(state.branches, action.listBranches),
        // branches: (!action.listBranches) ? state.branches : action.listBranches,
        branches: action.listBranches,

      };

    default:
      return state;
  }
};

export default branchReducer;
