import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';

// helper function to populate dialog with branch available.
const createRadioButtons = (branchesList) => {
  return branchesList.map((name) => {
    return <RadioButton key={name} value={name} label={name} />;
  });
};


class BranchDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBranch: '',
    };
    this.handleRadioButtonSelection = this.handleRadioButtonSelection.bind(this);
    this.submitBranchSelection = this.submitBranchSelection.bind(this);
  }

  handleRadioButtonSelection(e, branchName) {
    e.preventDefault();
    this.setState({ currentBranch: branchName });
  }

  submitBranchSelection() {
    this.props.selectBranch(this.state.currentBranch);
    this.props.handleBranchDialog();
  }

  render() {
    const { dialogState, branches } = this.props;
    const actions = [
      <FlatButton
        label="Ok"
        primary="true"
        onClick={this.submitBranchSelection}
      />,
    ];

    return (
      <Dialog
        title="Branches"
        actions={actions}
        modal={false}
        open={dialogState}
        autoScrollBodyContent={true} // eslint-disable-line
      >
        <RadioButtonGroup
          onChange={(event, value) => this.handleRadioButtonSelection(event, value)}
        >
          {createRadioButtons(branches)}
        </RadioButtonGroup>
      </Dialog>
    );
  }
}

BranchDialog.propTypes = {
  dialogState: PropTypes.bool,
  handleBranchDialog: PropTypes.func,
  branches: PropTypes.array,
  selectBranch: PropTypes.func,
};

export default BranchDialog;
