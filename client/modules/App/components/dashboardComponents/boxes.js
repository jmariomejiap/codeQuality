import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Equalizer from 'material-ui/svg-icons/av/equalizer';
import Group from 'material-ui/svg-icons/social/group';
import { white, red800, blue800 } from 'material-ui/styles/colors';

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


const dataTeam = {
  labels: ['Neo', 'Morpheus', 'Trinity', 'Smith', 'Oracle'],
  datasets: [{
    backgroundColor: [
      '#2ecc71', // light green
      '#3498db', // light blue
      '#f1c40f', // yellow
      '#e74c3c', // red
      '#34495e', // dark grey
    ],
    data: [28, 19, 12, 17, 23],
  }],
};

const DashboardContainers = () => {
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
              data={dataTeam}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>
        </Paper>
      </div>
      <div >
        <Paper style={style.paperChart} zDepth={2}>
          <AppBar
            title="Activity"
            showMenuIconButton={false}
            style={{ height: 58, backgroundColor: blue800, textAlign: 'left', zIndex: 100 }}
            titleStyle={{ fontSize: 18, color: white }}
            iconElementRight={
              <IconButton>
                <Equalizer color={white} />
              </IconButton>
            }
          />
          <div style={{ backgroundColor: white, height: '100%', padding: 50 }} >
            maybe an area to display Activity
          </div>
        </Paper>
      </div>
    </div>
  );
};

DashboardContainers.propTypes = {
  branches: PropTypes.array,
  escojeBranch: PropTypes.func,
  activeBranch: PropTypes.string,
};

export default DashboardContainers;
