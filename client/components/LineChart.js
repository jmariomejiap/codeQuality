import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Chart, Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import parseDatatoChart from '../util/parseDataToChart';
import {
  findScore,
  findTooltipData,
  findYAxesMin,
  findLastLabel
} from '../util/chartHelpers';

// custom plugin to draw vertical line over active tooltip
const myLineDraw = Chart.controllers.line.prototype.draw;
Chart.helpers.extend(Chart.controllers.line.prototype, {
  draw(ease) {
    myLineDraw.call(this, ease);
    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
      const activePoint = this.chart.tooltip._active[0];
      const ctx = this.chart.ctx;
      const x = activePoint.tooltipPosition().x;
      const topY = this.chart.scales['y-axis-0'].top;
      const bottomY = this.chart.scales['y-axis-0'].bottom;

      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([3, 6]);
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.strokeStyle = '#394f59';
      ctx.stroke();
      ctx.restore();
    }
  }
});

const styles = {
  outsideDiv: {
    height: 'calc(100vh - 63px)',
    width: '100%',
    position: 'relative'
  },
  porcentage: {
    fontSize: 65,
    position: 'absolute',
    right: 40,
    bottom: 200,
    fontFamily: 'Roboto Condensed',
    fontWeight: 700,
    color: '#262626',
    userSelect: 'none',
    zIndex: 1
  },
  weeksTerm: {
    fontSize: 30,
    position: 'absolute',
    left: '40%',
    bottom: 20,
    fontFamily: 'Roboto Condensed',
    fontWeight: 700,
    color: '#262626',
    userSelect: 'none',
    zIndex: 1
  },
  scaleLabel: {
    position: 'absolute',
    fontFamily: 'Roboto Condensed',
    color: '#262626',
    paddingLeft: 5,
    fontSize: 15,
    fontWeight: 'bold',
    zIndex: 0,
    userSelect: 'none'
  }
};

// main component
const LineChart = props => {
  const {
    activeBranchData,
    branchDurationDays,
    branchDurationWeeks,
    drawerState
  } = props;

  const options = {
    legend: {
      display: false
    },
    elements: {
      line: {
        lineTension: 1
      },
      point: {
        radius: 4
      }
    },
    tooltips: {
      mode: 'x-axis',
      axis: 'x',
      position: 'nearest',
      intersect: false,
      titleMarginBottom: 15,
      footerMarginTop: 15,
      footerFontStyle: 'regular',
      footerSpacing: 6,
      bodySpacing: 16,
      custom: tooltip => {
        if (!tooltip.dataPoints) {
          return;
        }

        if (tooltip.dataPoints[0].yLabel < 50) {
          tooltip.backgroundColor = 'rgba(20,0,0,0.9)'; // eslint-disable-line
        }

        if (
          tooltip.dataPoints[0].yLabel >= 50 &&
          tooltip.dataPoints[0].yLabel < 90
        ) {
          tooltip.backgroundColor = 'rgba(29, 29, 0, 0.9)'; // eslint-disable-line
        }

        if (tooltip.dataPoints[0].yLabel > 90) {
          tooltip.displayColors = true; // eslint-disable-line
        }
      },
      callbacks: {
        labelColor: tooltipItem => {
          const score = tooltipItem.yLabel;
          if (score <= 50) {
            return {
              borderColor: 'rgb(255, 0, 0)',
              backgroundColor: 'rgb(255, 0, 0)'
            };
          }

          if (score > 50 && score < 90) {
            return {
              borderColor: 'rgba(55, 55, 0, 0.9)', // 'rgb(255, 255, 77)',
              backgroundColor: 'rgba(255, 255, 100, 0.9)' // 'rgb(255, 255, 77)',
            };
          }

          return {
            borderColor: 'rgb(51, 204, 51)',
            backgroundColor: 'rgb(51, 204, 51)'
          };
        },
        labelTextColor: tooltipItem => {
          const score = tooltipItem.yLabel;
          if (score <= 50) {
            // return 'rgb(204, 51, 0)';
          }

          if (score > 50 && score < 90) {
            // return 'rgb(128, 128, 0)';
          }

          return 'white';
        },
        beforeFooter: tooltipItem => {
          const result = findTooltipData(
            activeBranchData,
            tooltipItem[0].index
          );
          return `Commit By : ${result.author}`;
        },
        footer: tooltipItem => {
          const result = findTooltipData(
            activeBranchData,
            tooltipItem[0].index
          );
          return `Message: ${result.message}`;
        }
      }
    },
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
            color: '#aaa',
            borderDash: [1, 5],
            drawBorder: false
          },
          ticks: {
            display: true,
            color: '#aaa',
            min:
              activeBranchData.length === 0
                ? 0
                : findYAxesMin(activeBranchData) - 5,
            max: 100
          },
          scaleLabel: {
            display: true,
            padding: 0
          },
          display: false
        }
      ],
      xAxes: [
        {
          display: false
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'box', // low coverage area
          drawTime: 'beforeDatasetsDraw',
          yScaleID: 'y-axis-0',
          yMin: 0,
          yMax: 50,
          borderColor: 'rgba(250, 5, 8, 0.075)',
          borderWidth: 1,
          backgroundColor: 'rgba(255, 2, 85, 0.05)'
        },
        {
          type: 'box', // red box right side
          drawTime: 'afterDatasetsDraw',
          yScaleID: 'y-axis-0',
          xScaleID: 'x-axis-0',
          yMin: 0,
          yMax: 50,
          xMin:
            activeBranchData.length === 0 ? 0 : findLastLabel(activeBranchData),
          xMax:
            activeBranchData.length === 0 ? 0 : findLastLabel(activeBranchData),
          borderColor: 'rgba(250, 5, 8, 0.9)',
          borderWidth: 15,
          backgroundColor: 'rgba(255, 2, 85, 0.9)'
        },
        {
          type: 'box', // medium coverage area
          drawTime: 'beforeDatasetsDraw',
          yScaleID: 'y-axis-0',
          yMin: 50,
          yMax: 90,
          borderWidth: 1,
          backgroundColor: 'rgba(247, 168, 0, 0.03', // 'rgba(255, 255, 0, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.10)'
        },
        {
          type: 'box', // Yellow box right side
          drawTime: 'afterDatasetsDraw',
          yScaleID: 'y-axis-0',
          xScaleID: 'x-axis-0',
          yMin: 50,
          yMax: 90,
          xMin:
            activeBranchData.length === 0 ? 0 : findLastLabel(activeBranchData),
          xMax:
            activeBranchData.length === 0 ? 0 : findLastLabel(activeBranchData),
          borderWidth: 15,
          borderColor: 'rgba(255, 215, 0, 0.9)'
        },
        {
          type: 'box', // high coverage area
          drawTime: 'beforeDatasetsDraw',
          yScaleID: 'y-axis-0',
          yMin: 90,
          yMax: 100,
          borderColor: 'rgba(7, 79, 7, 0.1)',
          borderWidth: 1,
          backgroundColor: 'rgba(7, 79, 7, 0.10)'
        },
        {
          type: 'box', // Green box right side
          drawTime: 'afterDatasetsDraw',
          yScaleID: 'y-axis-0',
          xScaleID: 'x-axis-0',
          yMin: 90,
          yMax: 100,
          xMin:
            activeBranchData.length === 0 ? 0 : findLastLabel(activeBranchData),
          xMax:
            activeBranchData.length === 0 ? 0 : findLastLabel(activeBranchData),
          borderWidth: 15,
          borderColor: 'rgba(0, 128, 0, 0.9)'
        }
      ]
    }
  };

  return (
    <div style={styles.outsideDiv}>
      <div style={styles.porcentage}>
        {activeBranchData.length === 0
          ? null
          : `${findScore(activeBranchData)}%`}
      </div>
      <div style={styles.weeksTerm}>
        {branchDurationWeeks === -1 ? null : `${branchDurationWeeks} Weeks`}
      </div>
      <div style={styles.weeksTerm}>
        {branchDurationDays === -1 ? null : `${branchDurationDays} Days`}
      </div>
      <div style={{ top: 6, ...styles.scaleLabel }}>
        {activeBranchData.length === 0 || drawerState === true ? null : '100 %'}
      </div>
      <div style={{ bottom: 0, ...styles.scaleLabel }}>
        {activeBranchData.length === 0 || drawerState === true
          ? null
          : `${findYAxesMin(activeBranchData) - 5} %`}
      </div>
      {activeBranchData.length === 0 ? null : (
        <Line
          data={parseDatatoChart(activeBranchData)}
          // redraw={true} // eslint-disable-line removes FLICKERING.
          width={200}
          height={500}
          options={options}
        />
      )}
    </div>
  );
};

LineChart.propTypes = {
  activeBranchData: PropTypes.array,
  branchDurationDays: PropTypes.number,
  branchDurationWeeks: PropTypes.number,
  drawerState: PropTypes.bool
};

function mapStateToProps(store) {
  return {
    activeBranchData: store.branches.activeBranchData,
    branchDurationDays: store.branches.branchDurationDays,
    branchDurationWeeks: store.branches.branchDurationWeeks,
    drawerState: store.projects.drawerIsOpen
  };
}

export default connect(mapStateToProps)(LineChart);
