import React, { PropTypes } from 'react';
import parseDatatoChart from '../../../../util/parseDataToChart';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Timeline from 'material-ui/svg-icons/action/timeline';
import { black, grey300, red900 } from 'material-ui/styles/colors';

import { Line } from 'react-chartjs-2';
import Divider from 'material-ui/Divider/Divider';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const options = {
  legend: {
    display: true,
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

const TableCommits = () => (
  <Table >
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow >
        <TableHeaderColumn style={{ width: 150, color: red900, fontSize: 16 }} >Build</TableHeaderColumn>
        <TableHeaderColumn style={{ width: 200, color: red900, fontSize: 16 }}>Committed by</TableHeaderColumn>
        <TableHeaderColumn style={{ color: red900, fontSize: 16 }}>Message</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      <TableRow>
        <TableRowColumn style={{ width: 150 }} >1</TableRowColumn>
        <TableRowColumn style={{ width: 200 }}>Neo</TableRowColumn>
        <TableRowColumn>'Improving tests. adding cool module. test coverage 100%'</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
);

const LineChart = (props) => {
  const { activeBranch, sampleData } = props;

  const createMenuItems = () => {
    const branchesList = props.branches;
    return branchesList.map((name) => {
      return <MenuItem key={name} primaryText={name} onClick={() => props.selectBranch(name)} />;
    });
  };


  return (
    <div style={{ height: '680px', marginTop: '20px' }}>
      <div style={{ height: '40%', width: '100%', padding: 10 }} >
        <Line
          data={(activeBranch.length === 0) ? sampleData : parseDatatoChart(activeBranch)}
          redraw={true} // eslint-disable-line
          width={200}
          height={200}
          options={options}
        />
      </div>
      <div style={{ marginTop: 20, paddingRight: 50, textAlign: 'right' }}>
        <IconMenu
          targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          iconButtonElement={
            <IconButton>
              <Timeline color={black} />
            </IconButton>
          }
        >
          {createMenuItems()}
        </IconMenu>
        <div >
          <h3>Last Build on {'Master'}</h3>
          <Divider
            style={{ backgroundColor: red900, marginLeft: 500 }}
            inset={true} // eslint-disable-line
          />
          <div style={{ backgroundColor: grey300, height: 40, marginLeft: 500 }}>
            <div style={{ textAlign: 'left', padding: 10, width: '70%' }}>
              <h4>COMMITED ON   '28 JAN 2018 - 4:00'</h4>
            </div>
            <TableCommits />
          </div>
        </div>
      </div>
    </div>
  );
};

LineChart.propTypes = {
  branches: PropTypes.array,
  selectBranch: PropTypes.func,
  activeBranch: PropTypes.array,
  sampleData: PropTypes.object,
};

export default LineChart;
