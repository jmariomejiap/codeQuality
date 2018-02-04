import React, { PropTypes } from 'react';
import { Line } from 'react-chartjs-2';
import parseDatatoChart from '../../../../util/parseDataToChart';

const options = {
  legend: {
    display: false,
    position: 'bottom',
  },
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        gridLines: {
          color: '#aaa',
          borderDash: [0, 1],
        },
        ticks: {
          display: false,
          color: '#aaa',
        },
        display: false,
      },
    ],
    xAxes: [
      {
        gridLines: {
          color: '#aaa',
          borderDash: [0, 3],
        },
        display: false,
      },
    ],
  },
};

const LineChart = (props) => {
  const { activeBranch, sampleData } = props;
  return (
    <div style={{ height: '40vh', width: '99%', paddingLeft: 20 }} >
      <Line
        data={(activeBranch.length === 0) ? sampleData : parseDatatoChart(activeBranch)}
        redraw={true} // eslint-disable-line
        width={200}
        height={500}
        options={options}
      />
    </div>
  );
};

LineChart.propTypes = {
  activeBranch: PropTypes.array,
  sampleData: PropTypes.object,
};

export default LineChart;
