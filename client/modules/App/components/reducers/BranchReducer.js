import data from '../data/index.json';
import { lineGraphSample, dataGraphBar, dataTeam } from '../data/sample';
import { BRANCH_SELECTED } from '../actions/BranchActions';

const initialState = {
  branches: ['master', 'develop', 'feature1', 'feature2', 'feature3', 'feature4'],
  commitHistory: data,
  doughnutGraph: dataTeam,
  barGraph: dataGraphBar,
  sampleGraph: lineGraphSample,
  activeBranch: [],
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
      if (BRANCH_SELECTED === 'all') {
        return state;
      }

      if (BRANCH_SELECTED === 'feature4') {
        return {
          ...state,
          activeBranch: filterData(state, action.payload),
        };
      }

      return {
        ...state,
        activeBranch: filterData(state, action.payload),
      };

    default:
      return state;
  }
};

export default branchReducer;
