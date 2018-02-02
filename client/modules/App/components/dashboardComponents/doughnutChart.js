import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider/Divider';

import { grey700 } from 'material-ui/styles/colors';

import { Doughnut } from 'react-chartjs-2';


const DoughnutChart = (props) => {
  const { doughnutGraph } = props;

  return (
    <div style={{ height: 500, paddingTop: 50 }}>
      <div style={{ textAlign: 'left', marginLeft: 250, marginRight: 100 }} >
        <Divider
          style={{ backgroundColor: grey700, height: 2 }}
          inset={false} // eslint-disable-line
        />
        <h3 style={{ fontFamily: 'Acme', marginTop: 5, color: '#394f59' }}>TEAM</h3>
      </div>
      <div style={{ height: 300, width: 300, marginTop: 70, marginLeft: '55%' }} >
        <Doughnut
          style={{ marginTop: 10 }}
          data={doughnutGraph}
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
