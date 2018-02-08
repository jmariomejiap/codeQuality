import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class CreateDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitInputValue = this.submitInputValue.bind(this);
  }

  handleInputChange(e) {
    const value = e.target.value;
    this.setState({
      text: value,
    });
  }

  submitInputValue() {
    const value = this.state.text;
    return this.props.createNewProject(value);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary="true"
        onClick={this.props.controlDialog}
      />,
      <FlatButton
        label="Submit"
        primary="true"
        keyboardFocused="true"
        onClick={this.submitInputValue}
      />,
    ];

    return (
      <Dialog
        title="Create Project"
        titleStyle={{ fontFamily: 'Roboto Condensed' }}
        modal={false}
        actions={actions}
        open={this.props.dialogState}
      >
        <br />
        <TextField
          name="newName"
          hintText="Enter you project name."
          onChange={this.handleInputChange}
        />
      </Dialog>
    );
  }
}

CreateDialog.propTypes = {
  dialogState: PropTypes.bool,
  controlDialog: PropTypes.func,
  createNewProject: PropTypes.func,
};

export default CreateDialog;
