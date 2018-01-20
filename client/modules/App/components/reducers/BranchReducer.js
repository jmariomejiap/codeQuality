import data from '../data/index.json';
import { BRANCH_SELECTED } from '../actions/BranchActions';

const initialState = {
  branches: ['master', 'develop', 'feature1', 'feature2', 'feature3', 'feature4'],
  commitHistory: data,
  activeBranch: [],

};

const filterData = (state, branchName) => {
  const filtered = state.commitHistory.filter((commitObject) => commitObject.branch === branchName);
  return filtered;
};

const branches = (state = initialState, action) => {
  switch (action.type) {
    case BRANCH_SELECTED:
      if (BRANCH_SELECTED === 'all') {
        return state;
      }
      return {
        ...state,
        activeBranch: filterData(state, action.payload),
      };
    default:
      return state;
  }
};

export default branches;
