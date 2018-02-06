import data from '../data/index.json';
import { lineGraphSample } from '../data/sample';
import { BRANCH_SELECTED, BRANCH_DIALOG_EVENT } from '../actions/BranchActions';

const initialState = {
  branches: ['master', 'develop', 'feature1', 'feature2', 'feature3', 'feature4'],
  commitHistory: data,
  sampleGraph: lineGraphSample,
  activeBranchData: [],
  branchDialogIsOpen: false,
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

    case BRANCH_DIALOG_EVENT :
      return {
        ...state,
        branchDialogIsOpen: !state.branchDialogIsOpen,
      };

    default:
      return state;
  }
};

export default branchReducer;
