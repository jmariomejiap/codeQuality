import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const TokenDialog = (props) => {
  const { controlDialog, dialogState } = props;

  const actions = [
    <FlatButton
      label="Ok"
      primary="true"
      onClick={controlDialog}
    />,
  ];

  return (
    <Dialog
      title="Success!"
      titleStyle={{ fontFamily: 'Acme' }}
      modal={false}
      actions={actions}
      open={dialogState}
    >
      <h5>Your project key is:</h5>
      <br />
      <p>xxxx-xxxx-xxxx-xxxx</p>
    </Dialog>
  );
};

TokenDialog.propTypes = {
  dialogState: PropTypes.bool,
  controlDialog: PropTypes.func,
};

export default TokenDialog;
