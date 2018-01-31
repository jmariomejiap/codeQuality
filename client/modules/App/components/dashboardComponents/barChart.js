import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider/Divider';

import { Bar } from 'react-chartjs-2';
import { indigo900 } from 'material-ui/styles/colors';


const BarChart = (props) => {
  const { barGraph } = props;

  return (
    <div style={{ height: '680px', marginTop: 50 }}>
      <div style={{ textAlign: 'right', paddingRight: 60 }} >
        <h3>Activity</h3>
        <Divider
          style={{ backgroundColor: indigo900, marginLeft: 600 }}
          inset={true} // eslint-disable-line
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceAround' }}>
        <div style={{ margin: '150px 0px 0px 120px', display: 'flex', flexDirection: 'column' }} >
          <div style={{ marginTop: 100, textAlign: 'center' }}>
            <p style={{ fontSize: '16' }}>
              ' Follow accross time the progress of your project.
            </p>
            <br />
            <p style={{ fontSize: '16' }}>
              See Who has make the most commits! '
            </p>
          </div>
        </div>
        <div style={{ height: 380, width: 800, marginTop: 150, marginLeft: 50, display: 'flex', flexDirection: 'column' }} >
          <Bar
            data={barGraph.data}
            options={barGraph.options}
            redraw={true} // eslint-disable-line
          />
        </div>
      </div>
    </div>
  );
};

BarChart.propTypes = {
  barGraph: PropTypes.object,
};

export default BarChart;
