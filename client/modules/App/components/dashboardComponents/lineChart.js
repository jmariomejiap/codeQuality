import React, { PropTypes } from 'react';
import { Line } from 'react-chartjs-2';
import parseDatatoChart from '../../../../util/parseDataToChart';


const LineChart = (props) => {
  const { activeBranchData, sampleData } = props;

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
        // afterLabel: () => {
          // return 'commitBy: Juan Mejia';
        // },
        afterBody: (tooltipItem, chart) => { // eslint-disable-line no-unused-vars
          return 'commitBy: Juan Mejia';
            // date: 6 February 2018
            // commit Message: 'this is a hard coded message'
        },
        beforeFooter: (tooltipItem, chart) => { // eslint-disable-line no-unused-vars
          // console.log('this is tooltipItem = ', tooltipItem);
          return 'Committ Message: "this is a hard coded message"';
        },
        /*
        footer: (tooltipItem, chart) => { // eslint-disable-line no-unused-vars
          return ['Custom footer', 'another Custom footer: '];
        },
        afterFooter: (tooltipItem, chart) => { // eslint-disable-line no-unused-vars
          return 'afterFooter';
        },
        */
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

  return (
    <div style={{ height: '60vh', width: '100%', position: 'relative' }} >
      <div style={{ fontSize: 65, position: 'absolute', right: 40, bottom: 200, fontFamily: 'Roboto Condensed', fontWeight: 700, color: '#394f59' }}>{'89%'}</div>
      <div style={{ fontSize: 30, position: 'absolute', left: '40%', bottom: 20, fontFamily: 'Roboto Condensed', fontWeight: 700, color: '#394f59' }}>{'3 Weeks'}</div>
      <Line
        data={(activeBranchData.length === 0) ? sampleData : parseDatatoChart(activeBranchData)}
        redraw={true} // eslint-disable-line
        width={200}
        height={500}
        options={options}
      />
    </div>
  );
};

LineChart.propTypes = {
  activeBranchData: PropTypes.array,
  sampleData: PropTypes.object,
};

export default LineChart;
