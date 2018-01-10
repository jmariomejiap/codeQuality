import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const CreateDialog = (props) => {
  const { dialogState, controlDialog } = props;
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
      onClick={controlDialog}
    />,
  ];

  return (
    <Dialog
      title="Create Project"
      modal={false}
      actions={actions}
      open={dialogState}
    >
      Here is where a project will be created.
      <br />
      <TextField
        hintText="Enter you project name."
      />
    </Dialog>
  );
};

CreateDialog.propTypes = {
  dialogState: PropTypes.bool,
  controlDialog: PropTypes.func,
};

export default CreateDialog;
