import data from '../data/index.json';
import { lineGraphSample } from '../data/sample';
import { BRANCH_SELECTED } from '../actions/BranchActions';

const initialState = {
  branches: ['master', 'develop', 'feature1', 'feature2', 'feature3', 'feature4'],
  commitHistory: data,
  sampleGraph: lineGraphSample,
  activeBranchData: [],
  currentBranch: 'master',
};

// helper function.
const filterData = (state, branchName) => {
  if (branchName === 'feature4') {
    return state.commitHistory;
  }
  const filtered = state.commitHistory.filter((commitObject) => commitObject.branch === branchName);
  return filtered;
};

const branchReducer = (state = initialState, action) => {
  switch (action.type) {
    case BRANCH_SELECTED:
      return {
        ...state,
        currentBranch: action.payload,
        activeBranchData: filterData(state, action.payload),
      };

    default:
      return state;
  }
};

export default branchReducer;
