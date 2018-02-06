import React, { PropTypes } from 'react';
import { Line } from 'react-chartjs-2';
import parseDatatoChart from '../../../../util/parseDataToChart';

const options = {
  legend: {
    display: false,
  },
  elements: {
    line: {
      lineTension: 1,
    },
  },
  lineTension: 1,
  tooltips: {
    callbacks: {
      labelTextColor: (tooltipItem, chart) => { // eslint-disable-line no-unused-vars
        return 'white';
      },
      // title: (tooltipItem, chart) => {
        // return 'Custome Title';
      // },
      afterLabel: () => {
        return 'afterLabel';
      },
      afterBody: (tooltipItem, chart) => { // eslint-disable-line no-unused-vars
        return 'afterBody';
      },
      beforeFooter: (tooltipItem, chart) => { // eslint-disable-line no-unused-vars
        return 'beforeFooter';
      },
      footer: (tooltipItem, chart) => { // eslint-disable-line no-unused-vars
        return ['Custom footer', 'another Custom footer: '];
      },
      afterFooter: (tooltipItem, chart) => { // eslint-disable-line no-unused-vars
        return 'afterFooter';
      },
    },
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
    <div style={{ height: '60vh', width: '100%', paddingLeft: 20, position: 'relative' }} >
      <div style={{ fontSize: 70, position: 'absolute', right: 40, bottom: 200, fontFamily: 'Londrina Outline', color: 'white' }}>{'89%'}</div>
      <div style={{ fontSize: 30, position: 'absolute', left: '40%', bottom: 20, fontFamily: 'Acme', color: 'white' }}>{'3 Weeks'}</div>
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
