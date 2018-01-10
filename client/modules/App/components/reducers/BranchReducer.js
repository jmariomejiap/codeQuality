import { BRANCH_SELECTED } from '../actions/BranchActions';


export const activeBranch = (state = null, action) => {
  switch (action.type) {
    case BRANCH_SELECTED:
      return action.payload;
      // break;
    default:
      return state;
  }
};


export default function () {
  return ['master', 'develop', 'feature', 'feature2', 'feature3', 'feature4'];
}
