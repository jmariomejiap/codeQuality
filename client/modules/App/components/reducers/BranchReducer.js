// import _ from 'lodash';
import {
  BRANCH_SELECTED,
  FETCHED_BRANCHES,
  DURATION_DAYS,
  DURATION_WEEKS,
  SET_NEXT_ACTION,
  NO_BRANCHES,
  RESET_BRANCH_DURATION,
  BRANCH_INPUT,
} from '../actions/BranchActions';

const initialState = {
  branches: [],
  activeBranchData: [],
  currentBranch: '',
  searchingBranchInput: '',
  branchDurationWeeks: -1,
  branchDurationDays: -1,
  nextAction: 'loading',
};


const branchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEXT_ACTION:
      return {
        ...state,
        nextAction: action.instruction,
      };

    case BRANCH_INPUT:
      return {
        ...state,
        searchingBranchInput: action.input,
      };

    case BRANCH_SELECTED:
      return {
        ...state,
        currentBranch: action.branchName,
        activeBranchData: action.branchData,
      };

    case FETCHED_BRANCHES:
      return {
        ...state,
        currentBranch: '',
        branches: action.listBranches,
      };

    case NO_BRANCHES:
      return {
        ...state,
        branches: [],
        activeBranchData: [],
        currentBranch: '',
      };

    case RESET_BRANCH_DURATION:
      return {
        ...state,
        branchDurationWeeks: -1,
        branchDurationDays: -1,
      };

    case DURATION_DAYS:
      return {
        ...state,
        branchDurationDays: action.duration,
        branchDurationWeeks: -1,
      };

    case DURATION_WEEKS:
      return {
        ...state,
        branchDurationWeeks: action.duration,
        branchDurationDays: -1,
      };

    default:
      return state;
  }
};

export default branchReducer;
