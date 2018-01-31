import React, { PropTypes } from 'react';
import parseDatatoChart from '../../../../util/parseDataToChart';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import CallSplit from 'material-ui/svg-icons/communication/call-split';
import { black, grey300, green500 } from 'material-ui/styles/colors';

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
        display: true,
      },
    ],
  },
};

const TableCommits = () => (
  <Table >
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow >
        <TableHeaderColumn style={{ width: 150, color: black, fontSize: 16 }} >Build</TableHeaderColumn>
        <TableHeaderColumn style={{ width: 200, color: black, fontSize: 16 }}>Committed by</TableHeaderColumn>
        <TableHeaderColumn style={{ color: black, fontSize: 16 }}>Message</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      <TableRow>
        <TableRowColumn style={{ width: 150 }} >1</TableRowColumn>
        <TableRowColumn style={{ width: 200 }}>Neo</TableRowColumn>
        <TableRowColumn>'Improving tests. adding cool module. test coverage 100%'</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn style={{ width: 150 }} >2</TableRowColumn>
        <TableRowColumn style={{ width: 200 }}>Trinity</TableRowColumn>
        <TableRowColumn>'Fixing bug, controller'</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn style={{ width: 150 }} >3</TableRowColumn>
        <TableRowColumn style={{ width: 200 }}>Neo</TableRowColumn>
        <TableRowColumn>'adding Route for new endpoint'</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn style={{ width: 150 }} >4</TableRowColumn>
        <TableRowColumn style={{ width: 200 }}>Morpheus</TableRowColumn>
        <TableRowColumn>'Adding Authorization, face recongnition.'</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
);


class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBranch: 'Master',
    };
  }


  createMenuItems() {
    const branchesList = this.props.branches;
    return branchesList.map((name) => {
      return <MenuItem key={name} primaryText={name} onClick={() => this.handleSelectedBranch(name)} />;
    });
  }

  handleSelectedBranch(name) {
    this.setState({ selectedBranch: name });
    this.props.selectBranch(name);
  }


  render() {
    return (
      <div style={{ height: '980px', marginTop: '80px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceAround', marginTop: 150 }}>
          <div style={{ height: 350, width: 600, margin: '50px 0px 0px 130px', display: 'flex', flexDirection: 'column' }} >
            <Line
              data={(this.props.activeBranch.length === 0) ? this.props.sampleData : parseDatatoChart(this.props.activeBranch)}
              redraw={true} // eslint-disable-line
              width={200}
              height={200}
              options={options}
            />
          </div>
          <div style={{ height: 300, width: 500, margin: '40px 0px 0px 110px', padding: 40, display: 'flex', flexDirection: 'column' }} >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceAround' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'right' }} >
                <h2 style={{ marginTop: 20 }}>Check your Branch Coverage</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }} >
                <IconMenu
                  targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                  anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                  iconButtonElement={
                    <IconButton iconStyle={{ width: 50, height: 45, marginLeft: 0, paddingTop: 0 }}>
                      <CallSplit
                        color={black}
                      />
                    </IconButton>
                  }
                >
                  {this.createMenuItems()}
                </IconMenu>
              </div>
            </div>
            <p style={{ fontSize: 19 }}>
              Select branch to see its coverage throughout time.
            </p>
            <p style={{ fontSize: 19 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div style={{ marginTop: 120, paddingRight: 60, textAlign: 'right' }}>
          <div >
            <div style={{}}>
              <IconMenu
                targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                iconButtonElement={
                  <IconButton iconStyle={{ width: 50, height: 45, marginLeft: 0, paddingTop: 0 }}>
                    <CallSplit
                      color={black}
                    />
                  </IconButton>
                }
              >
                {this.createMenuItems()}
              </IconMenu>
              <h3 style={{}}>Last Build on {this.state.selectedBranch}</h3>
            </div>
            <Divider
              style={{ backgroundColor: green500, marginLeft: 600 }}
              inset={true} // eslint-disable-line
            />
            <div style={{ backgroundColor: grey300, height: 40, marginLeft: 600 }}>
              <div style={{ textAlign: 'left', padding: 10, width: '70%' }}>
                <h4>COMMITED ON   '28 JAN 2018 - 4:00'</h4>
              </div>
              <TableCommits />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LineChart.propTypes = {
  branches: PropTypes.array,
  selectBranch: PropTypes.func,
  activeBranch: PropTypes.array,
  sampleData: PropTypes.object,
};

export default LineChart;
