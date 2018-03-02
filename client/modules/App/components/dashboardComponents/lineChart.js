import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import parseDatatoChart from '../../../../util/parseDataToChart';

const styles = {
  outsideDiv: {
    height: 'calc(100vh - 63px)', // calculates height dynamicly
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
    color: '#262626',
  },
  weeksTerm: {
    fontSize: 30,
    position: 'absolute',
    left: '40%',
    bottom: 20,
    fontFamily: 'Roboto Condensed',
    fontWeight: 700,
    color: '#262626',
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

const findYAxesMin = (arrayCommits) => {
  const sortedByScore = _.sortBy(arrayCommits, [(objA) => objA.statementsCoveragePorcentage]);
  const min = sortedByScore[0].statementsCoveragePorcentage;
  return min;
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
      point: {
        radius: 4,
      },
    },
    tooltips: {
      titleMarginBottom: 15,
      footerMarginTop: 15,
      footerFontStyle: 'regular',
      footerSpacing: 6,
      bodySpacing: 16,
      // displayColors: false,
      // borderColor: 'rgba(55,0,0,0.8)', doesnt work
      // titleFontSize: 14,
      // backgroundColor: 'red',
      custom: (tooltip) => {
        if (!tooltip.dataPoints) { return; }


        if (tooltip.dataPoints[0].yLabel < 50) {
          tooltip.backgroundColor = 'rgba(20,0,0,0.9)'; // eslint-disable-line
          // return;
        }

        if (tooltip.dataPoints[0].yLabel >= 50 && tooltip.dataPoints[0].yLabel < 90) {
          tooltip.backgroundColor = 'rgba(29, 29, 0, 0.9)';  // eslint-disable-line
          // return;
        }

        if (tooltip.dataPoints[0].yLabel > 90) {
          tooltip.displayColors = true; // eslint-disable-line
        }
      },
      callbacks: {
        labelColor: (tooltipItem) => {
          const score = tooltipItem.yLabel;
          if (score <= 50) {
            return {
              borderColor: 'rgb(255, 0, 0)',
              backgroundColor: 'rgb(255, 0, 0)',
            };
          }

          if (score > 50 && score < 90) {
            return {
              borderColor: 'rgba(55, 55, 0, 0.9)', // 'rgb(255, 255, 77)',
              backgroundColor: 'rgba(255, 255, 100, 0.9)', // 'rgb(255, 255, 77)',
            };
          }

          return {
            borderColor: 'rgb(51, 204, 51)',
            backgroundColor: 'rgb(51, 204, 51)',
          };
        },
        labelTextColor: (tooltipItem) => {
          const score = tooltipItem.yLabel;
          if (score <= 50) {
            // return 'rgb(204, 51, 0)';
          }

          if (score > 50 && score < 90) {
            // return 'rgb(128, 128, 0)';
          }

          return 'white';
        },
        beforeFooter: (tooltipItem) => {
          const result = findTooltipData(activeBranchData, tooltipItem[0].index);
          return `Commit By : ${result.author}`;
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
            display: true,
            color: '#aaa',
            borderDash: [1, 5],
            drawBorder: false,
          },
          ticks: {
            display: false, // 50, 50 , 70 legends
            color: '#aaa',
            min: (activeBranchData.length === 0) ? 0 : (findYAxesMin(activeBranchData) - 5),
            max: 100,
          },
          scaleLabel: {
            display: false,
          },
          display: false, // grid lines
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
    // background color
    annotation: {
      annotations: [{
        type: 'box',
        yScaleID: 'y-axis-0',
        yMin: 0,
        yMax: 50,
        borderColor: 'rgba(182, 10, 28, 0.40)',
        borderWidth: 2,
        backgroundColor: 'rgba(182, 10, 28, 0.3)',
        // backgroundColor: 'rgba(247, 168, 0, 0.20'
        // backgroundColor: 'rgba(255, 255, 255, 0.10)', // white transparent
      }, {
        type: 'box',
        yScaleID: 'y-axis-0',
        yMin: 50,
        yMax: 90,
        borderColor: 'rgba(247, 168, 0, 0.05)',
        borderWidth: 0.5,
        backgroundColor: 'rgba(247, 168, 0, 0.05', // 'rgba(255, 255, 0, 0.05)',
        // backgroundColor: 'rgba(255, 255, 255, 0.10)',
        // borderColor: 'rgba(255, 255, 255, 0.10)',
      }, {
        type: 'box',
        yScaleID: 'y-axis-0',
        yMin: 90,
        yMax: 100,
        borderColor: 'rgba(7, 79, 7, 0.07)',
        borderWidth: 0.5,
        backgroundColor: 'rgba(7, 79, 7, 0.07)',
      }],
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


function mapStateToProps(store) {
  return {
    activeBranchData: store.branches.activeBranchData,
    branchDurationDays: store.branches.branchDurationDays,
    branchDurationWeeks: store.branches.branchDurationWeeks,
  };
}

export default connect(mapStateToProps)(LineChart);
