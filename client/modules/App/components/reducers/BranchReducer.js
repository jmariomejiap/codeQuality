// import _ from 'lodash';
import { BRANCH_SELECTED, FETCHED_BRANCHES, BRANCH_DURATION } from '../actions/BranchActions';

const initialState = {
  branches: [],
  activeBranchData: [],
  currentBranch: '',
  branchDuration: -1,
};


const branchReducer = (state = initialState, action) => {
  switch (action.type) {
    case BRANCH_SELECTED:
      return {
        ...state,
        currentBranch: action.branchName,
        activeBranchData: action.branchData,
      };

    case FETCHED_BRANCHES:
      return {
        ...state,
        branches: action.listBranches,
      };

    case BRANCH_DURATION:
      return {
        ...state,
        branchDuration: action.duration,
      };

    default:
      return state;
  }
};

export default branchReducer;
