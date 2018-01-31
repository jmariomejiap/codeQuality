import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider/Divider';

import { blue800 } from 'material-ui/styles/colors';

import { Doughnut } from 'react-chartjs-2';


const DoughnutChart = (props) => {
  const { doughnutGraph } = props;

  return (
    <div style={{ height: '800px', marginTop: 50, paddingTop: 50 }}>
      <div style={{ textAlign: 'left', paddingLeft: 60 }} >
        <h3>Team</h3>
        <Divider
          style={{ backgroundColor: blue800, marginRight: 700 }}
          inset={false} // eslint-disable-line
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceAround' }}>
        <div style={{ height: 400, width: 400, margin: '150px 0px 0px 280px', display: 'flex', flexDirection: 'column' }} >
          <Doughnut
            style={{ marginTop: 10 }}
            data={doughnutGraph}
            width={100}
            height={100}
            redraw={true} // eslint-disable-line
            options={{
              maintainAspectRatio: false,
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: 700, padding: '210px 0px 0px 80px' }}>
          <div style={{ marginTop: 100, textAlign: 'center' }}>
            <p style={{ fontSize: '16' }}>
              ' Check the contribution of each Team member to your project.
            </p>
            <br />
            <p style={{ fontSize: '16' }}>
              See Who makes the most commits! '
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

DoughnutChart.propTypes = {
  doughnutGraph: PropTypes.object,
};

export default DoughnutChart;
