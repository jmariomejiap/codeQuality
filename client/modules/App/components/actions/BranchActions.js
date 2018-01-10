export const BRANCH_SELECTED = 'BRANCH_SELECTED';

const selectBranch = (name) => {
  // console.log(name, ' branch has been selected');
  return {
    type: BRANCH_SELECTED,
    payload: name,
  };
};

export default selectBranch;
