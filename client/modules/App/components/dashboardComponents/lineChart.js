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
  const score = lastCommit.statementsCoveragePorcentage;
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
  const { activeBranchData, branchDurationDays, branchDurationWeeks } = props;

  const options = {
    legend: {
      display: false,
    },
    elements: {
      line: {
        lineTension: 1,
      },
      point: { radius: 6 },
    },
    lineTension: 1,
    tooltips: {
      // backgroundColor: 'red',
      footerFontStyle: 'regular',
      footerSpacing: 5,
      callbacks: {
        labelColor: (tooltipItem) => {
          const score = tooltipItem.yLabel;
          if (score <= 55) {
            return {
              borderColor: 'rgb(255, 0, 0)',
              backgroundColor: 'rgb(255, 0, 0)',
            };
          }

          if (score > 55 && score < 85) {
            return {
              borderColor: 'rgb(255, 255, 77)',
              backgroundColor: 'rgb(255, 255, 77)',
            };
          }

          return {
            borderColor: 'rgb(51, 204, 51)',
            backgroundColor: 'rgb(51, 204, 51)',
          };
        },
        labelTextColor: (tooltipItem) => {
          const score = tooltipItem.yLabel;
          if (score <= 55) {
            return 'rgb(204, 51, 0)';
          }

          if (score > 55 && score < 85) {
            return 'rgb(128, 128, 0)';
          }

          return 'white';
        },
        beforeFooter: (tooltipItem) => {
          const result = findTooltipData(activeBranchData, tooltipItem[0].index);
          return `commitBy: ${result.author}`;
        },
        footer: (tooltipItem) => {
          const result = findTooltipData(activeBranchData, tooltipItem[0].index);
          return `Message: ${result.message}`;
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

  return (
    <div style={styles.outsideDiv} >
      <div style={styles.porcentage}>{(activeBranchData.length === 0) ? null : `${findScore(activeBranchData)}%`}</div>
      <div style={styles.weeksTerm}>{(branchDurationWeeks === -1) ? null : `${branchDurationWeeks} Weeks`}</div>
      <div style={styles.weeksTerm}>{(branchDurationDays === -1) ? null : `${branchDurationDays} Days`}</div>

      {(activeBranchData.length === 0) ? null :
        <Line
          data={parseDatatoChart(activeBranchData)}
          redraw={true} // eslint-disable-line
          width={200}
          height={500}
          options={options}
        />
      }
    </div>
  );
};

LineChart.propTypes = {
  activeBranchData: PropTypes.array,
  branchDurationDays: PropTypes.number,
  branchDurationWeeks: PropTypes.number,
};

export default LineChart;
