import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {
  resetBranchDuration,
  foundEmptyBranches
} from '../redux/actions/BranchActions';
import {
  updateCreateProjectInput,
  createProjectApi,
  controlProjectDialog,
  clearCreateProjectInput
} from '../redux/actions/ProjectActions';

const CreateDialog = props => {
  const { dispatch, projectDialogState, nameInput } = props;

  const closeDialog = () => {
    dispatch(controlProjectDialog());
  };

  const handleInputChange = e => {
    const value = e.target.value;
    dispatch(updateCreateProjectInput(value));
  };

  const submitInputValue = () => {
    const name = nameInput;
    dispatch(createProjectApi(name));
    dispatch(controlProjectDialog());
    dispatch(clearCreateProjectInput());
    dispatch(foundEmptyBranches());
    dispatch(resetBranchDuration());
  };

  const actions = [
    <FlatButton label="Cancel" primary="true" onClick={closeDialog} />,
    <FlatButton
      label="Submit"
      primary="true"
      keyboardFocused="true"
      onClick={submitInputValue}
    />
  ];

  return (
    <Dialog
      title="Create Project"
      titleStyle={{ fontFamily: 'Roboto Condensed' }}
      modal={false}
      actions={actions}
      open={projectDialogState}
    >
      <br />
      <TextField
        name="newName"
        hintText="Enter you project name."
        onChange={handleInputChange}
      />
    </Dialog>
  );
};

CreateDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nameInput: PropTypes.string,
  projectDialogState: PropTypes.bool
};

function mapStateToProps(store) {
  return {
    projectDialogState: store.projects.projectDialogIsOpen,
    nameInput: store.projects.projectInputValue
  };
}

export default connect(mapStateToProps)(CreateDialog);
