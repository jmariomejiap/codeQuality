import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Group from 'material-ui/svg-icons/social/group';
import { white, red800 } from 'material-ui/styles/colors';

import { Doughnut } from 'react-chartjs-2';


const style = {
  paperChart: {
    height: 350,
    width: '70%',
    backgroundColor: white,
    marginTop: 100,
    marginBottom: 100,
    marginLeft: 200,
    display: 'inline-block',
  },
};


const DoughnutChart = (props) => {
  const { doughnutGraph } = props;

  return (
    <div>
      <div >
        <Paper style={style.paperChart} zDepth={2}>
          <AppBar
            title="Team"
            showMenuIconButton={false}
            style={{ height: 58, backgroundColor: red800, textAlign: 'left', zIndex: 100 }}
            titleStyle={{ fontSize: 18, color: white }}
            iconElementRight={
              <IconButton>
                <Group color={white} />
              </IconButton>
            }
          />
          <div style={{ backgroundColor: white, height: '100%', padding: 50 }} >
            <p style={{ marginBottom: 20 }}>maybe a Doughnut to display test coverage by team member</p>
            <Doughnut
              style={{ marginTop: 10 }}
              data={doughnutGraph}
              width={100}
              height={50}
              redraw={true} // eslint-disable-line
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>
        </Paper>
      </div>
    </div>
  );
};

DoughnutChart.propTypes = {
  doughnutGraph: PropTypes.object,
};

export default DoughnutChart;
