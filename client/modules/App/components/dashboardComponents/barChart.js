import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider/Divider';

import { Bar } from 'react-chartjs-2';
import { grey700 } from 'material-ui/styles/colors';


const BarChart = (props) => {
  const { barGraph } = props;

  return (
    <div style={{ paddingTop: 50, paddingBottom: 80 }}>
      <div style={{ textAlign: 'left', marginLeft: 250, marginRight: 100 }} >
        <Divider
          style={{ backgroundColor: grey700, height: 2 }}
          inset={false}
        />
        <h3 style={{ fontFamily: 'Acme', marginTop: 5, color: '#394f59' }}>ACTIVITY</h3>
      </div>
      <div style={{ height: 280, width: 500, marginTop: 70, marginLeft: '35%' }} >
        <Bar
          data={barGraph.data}
          options={barGraph.options}
          redraw={true} // eslint-disable-line
        />
      </div>
    </div>
  );
};

BarChart.propTypes = {
  barGraph: PropTypes.object,
};

export default BarChart;
