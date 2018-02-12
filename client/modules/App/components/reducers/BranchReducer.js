// import _ from 'lodash';
import { BRANCH_SELECTED, FETCHED_BRANCHES } from '../actions/BranchActions';

const initialState = {
  branches: [],
  activeBranchData: [],
  currentBranch: '',
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

    default:
      return state;
  }
};

export default branchReducer;
