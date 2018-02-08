import React from 'react';

const styles = {
  wholeDiv: {
    paddingLeft: '35%',
    paddingTop: 300,
    height: '100vh',
    fontFamily: 'Roboto Condensed',
  },
};

const EmptyProjectPage = () => {
  return (
    <div style={styles.wholeDiv}>
      <h2>No Projects have been created yet</h2>
      <h3>Create your first project</h3>
    </div>
  );
};

export default EmptyProjectPage;
