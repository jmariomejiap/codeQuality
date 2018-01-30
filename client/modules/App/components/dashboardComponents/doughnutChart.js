import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider/Divider';

import { red900 } from 'material-ui/styles/colors';

import { Doughnut } from 'react-chartjs-2';


const DoughnutChart = (props) => {
  const { doughnutGraph } = props;

  return (
    <div style={{ height: '680px', marginTop: 50 }}>
      <div style={{ textAlign: 'right', paddingRight: 50 }} >
        <h3>Team</h3>
        <Divider
          style={{ backgroundColor: red900, marginLeft: 500 }}
          inset={true} // eslint-disable-line
        />
      </div>
      <div style={{ height: '60%', marginTop: 150 }} >
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
    </div>
  );
};

DoughnutChart.propTypes = {
  doughnutGraph: PropTypes.object,
};

export default DoughnutChart;
