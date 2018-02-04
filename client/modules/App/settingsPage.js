import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { red900, white } from 'material-ui/styles/colors';

const styles = {
  container: {
    paddingLeft: '40%',
    paddingTop: 300,
    height: '100vh',
  },
  button: {
    marginTop: 40,
  },
  label: {
    padding: 9,
    backgroundColor: red900,
  },
};

const Settings = () => {
  return (
    <div style={styles.container}>
      <h1>SETTINGS PAGE!</h1>
      <Link to="/">
        <RaisedButton label="go back!" buttonStyle={styles.label} labelColor={white} style={styles.button} />
      </Link>
    </div>
  );
};

export default Settings;
