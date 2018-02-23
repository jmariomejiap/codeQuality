import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


const CreateDialog = (props) => {
  const { handleCreateProjectInput, createNewProject, controlDialog, dialogState } = props;

  const handleInputChange = (e) => {
    const value = e.target.value;
    handleCreateProjectInput(value);
  };

  const submitInputValue = () => {
    createNewProject();
  };

  const actions = [
    <FlatButton
      label="Cancel"
      primary="true"
      onClick={controlDialog}
    />,
    <FlatButton
      label="Submit"
      primary="true"
      keyboardFocused="true"
      onClick={submitInputValue}
    />,
  ];

  return (
    <Dialog
      title="Create Project"
      titleStyle={{ fontFamily: 'Roboto Condensed' }}
      modal={false}
      actions={actions}
      open={dialogState}
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
  dialogState: PropTypes.bool,
  controlDialog: PropTypes.func,
  createNewProject: PropTypes.func,
  handleCreateProjectInput: PropTypes.func,
};

export default CreateDialog;
