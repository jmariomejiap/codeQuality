import React, { PropTypes } from 'react';
import { Line } from 'react-chartjs-2';
import parseDatatoChart from '../../../../util/parseDataToChart';

const styles = {
  outsideDiv: {
    height: '60vh',
    width: '100%',
    position: 'relative',
  },
  porcentage: {
    fontSize: 65,
    position: 'absolute',
    right: 40,
    bottom: 200,
    fontFamily: 'Roboto Condensed',
    fontWeight: 700,
    color: '#394f59',
  },
  weeksTerm: {
    fontSize: 30,
    position: 'absolute',
    left: '40%',
    bottom: 20,
    fontFamily: 'Roboto Condensed',
    fontWeight: 700,
    color: '#394f59',
  },
};

// helper function
const findScore = (arrayCommits) => {
  const lastCommit = arrayCommits[arrayCommits.length - 1];
  const score = lastCommit.testCoveragePorcentage.lines.pct;
  return score;
};
// helper function
const findTooltipData = (arrayCommits, positionTooltip) => {
  const currentCommitObject = arrayCommits[positionTooltip];
  return {
    author: currentCommitObject.author,
    message: currentCommitObject.message,
  };
};


// main component
const LineChart = (props) => {
  const { activeBranchData, durationWeeks } = props;

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
          const result = findTooltipData(activeBranchData, tooltipItem[0].index);
          return `commitBy: ${result.author}`;
            // date: 6 February 2018
            // commit Message: 'this is a hard coded message'
        },
        beforeFooter: (tooltipItem, chart) => { // eslint-disable-line no-unused-vars
          // console.log('this is tooltipItem = ', tooltipItem);
          const result = findTooltipData(activeBranchData, tooltipItem[0].index);
          return `Message: ${result.message}`;
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
    <div style={styles.outsideDiv} >
      <div style={styles.porcentage}>{(activeBranchData.length === 0) ? null : `${findScore(activeBranchData)}%`}</div>
      <div style={styles.weeksTerm}>{(durationWeeks === -1) ? null : `${durationWeeks} Weeks`}</div>
      <Line
        data={(activeBranchData.length === 0) ? null : parseDatatoChart(activeBranchData)}
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
  durationWeeks: PropTypes.number,
};

export default LineChart;
