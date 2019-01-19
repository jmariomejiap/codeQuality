import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { controlTokenDialog } from '../redux/actions/ProjectActions';

const TokenDialog = props => {
  const { dispatch, tokenDialogState, tokenData } = props;

  const closeTokenDialog = () => {
    dispatch(controlTokenDialog());
  };

  const actions = [
    <FlatButton label="Ok" primary="true" onClick={closeTokenDialog} />
  ];

  return (
    <Dialog
      title="Success!"
      titleStyle={{ fontFamily: 'Roboto Condensed' }}
      modal={false}
      actions={actions}
      open={tokenDialogState}
    >
      <h5>Your project key is:</h5>
      <br />
      <p>{tokenData.length === 0 ? null : tokenData[0].saved.token}</p>
    </Dialog>
  );
};

TokenDialog.propTypes = {
  dispatch: PropTypes.func,
  tokenDialogState: PropTypes.bool,
  tokenData: PropTypes.array
};

function mapStateToProps(store) {
  return {
    tokenDialogState: store.projects.tokenDialogIsOpen,
    tokenData: store.projects.tokenData
  };
}

export default connect(mapStateToProps)(TokenDialog);
