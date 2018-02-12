import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const TokenDialog = (props) => {
  const { controlDialog, dialogState, tokenData } = props;

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
      titleStyle={{ fontFamily: 'Roboto Condensed' }}
      modal={false}
      actions={actions}
      open={dialogState}
    >
      <h5>Your project key is:</h5>
      <br />
      <p>{(tokenData.length === 0) ? null : tokenData[0].saved.token}</p>
    </Dialog>
  );
};

TokenDialog.propTypes = {
  dialogState: PropTypes.bool,
  controlDialog: PropTypes.func,
  tokenData: PropTypes.array,
};

export default TokenDialog;
