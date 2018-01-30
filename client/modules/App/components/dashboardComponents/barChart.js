import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider/Divider';

import { Bar } from 'react-chartjs-2';
import { red900 } from 'material-ui/styles/colors';


const BarChart = (props) => {
  const { barGraph } = props;

  return (
    <div style={{ height: '680px', marginTop: 50 }}>
      <div style={{ textAlign: 'right', paddingRight: 50 }} >
        <h3>Activity</h3>
        <Divider
          style={{ backgroundColor: red900, marginLeft: 500 }}
          inset={true} // eslint-disable-line
        />
      </div>
      <div style={{ height: '50%', width: '70%', marginTop: 150, marginLeft: 250 }} >
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
