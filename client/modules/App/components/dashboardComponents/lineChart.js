import React, { PropTypes } from 'react';
import parseDatatoChart from '../../../../util/parseDataToChart';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import CallSplit from 'material-ui/svg-icons/communication/call-split';
import { grey600, grey700, transparent } from 'material-ui/styles/colors';

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

const styleTableHeader = { fontSize: 11, paddingLeft: 10, fontFamily: 'Acme' };

const TableCommits = () => (
  <Table style={{ backgroundColor: transparent }}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow >
        <TableHeaderColumn style={{ width: 90, ...styleTableHeader }} >BUILDS</TableHeaderColumn>
        <TableHeaderColumn style={{ width: 100, fontSize: 11, paddingLeft: 10, fontFamily: 'Acme' }}>BRANCH</TableHeaderColumn>
        <TableHeaderColumn style={{ width: 130, ...styleTableHeader }}>COVERAGE</TableHeaderColumn>
        <TableHeaderColumn style={{ width: 180, ...styleTableHeader }}>COMMIT</TableHeaderColumn>
        <TableHeaderColumn style={{ width: 120, ...styleTableHeader }}>COMMITER</TableHeaderColumn>
        <TableHeaderColumn style={{ width: 80, ...styleTableHeader }}>TYPE</TableHeaderColumn>
        <TableHeaderColumn style={{ width: 274, ...styleTableHeader }}>TIME</TableHeaderColumn>
        <TableHeaderColumn style={styleTableHeader}>VIA</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      <TableRow>
        <TableRowColumn style={{ width: 90, paddingLeft: 10 }} >1</TableRowColumn>
        <TableRowColumn style={{ width: 100, paddingLeft: 10 }} >develop</TableRowColumn>
        <TableRowColumn style={{ width: 130, paddingLeft: 10 }} >80%</TableRowColumn>
        <TableRowColumn style={{ width: 180, paddingLeft: 10 }} >'adding cool feature'</TableRowColumn>
        <TableRowColumn style={{ width: 120, paddingLeft: 10 }} >Neo</TableRowColumn>
        <TableRowColumn style={{ width: 80, paddingLeft: 10 }} >Push</TableRowColumn>
        <TableRowColumn style={{ width: 274, paddingLeft: 10 }} >15 Sep 2012 05:34AM UTC</TableRowColumn>
        <TableRowColumn style={{ paddingLeft: 10 }} >Travis-CI</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn style={{ width: 90, paddingLeft: 10 }} >2</TableRowColumn>
        <TableRowColumn style={{ width: 100, paddingLeft: 10 }} >develop</TableRowColumn>
        <TableRowColumn style={{ width: 130, paddingLeft: 10 }} >70%</TableRowColumn>
        <TableRowColumn style={{ width: 180, paddingLeft: 10 }} >'adding test boom'</TableRowColumn>
        <TableRowColumn style={{ width: 120, paddingLeft: 10 }} >Neo</TableRowColumn>
        <TableRowColumn style={{ width: 80, paddingLeft: 10 }} >Push</TableRowColumn>
        <TableRowColumn style={{ width: 274, paddingLeft: 10 }} >25 Sep 2012 05:34AM UTC</TableRowColumn>
        <TableRowColumn style={{ paddingLeft: 10 }} >Travis-CI</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn style={{ width: 90, paddingLeft: 10 }} >2</TableRowColumn>
        <TableRowColumn style={{ width: 100, paddingLeft: 10 }} >feature1</TableRowColumn>
        <TableRowColumn style={{ width: 130, paddingLeft: 10 }} >90%</TableRowColumn>
        <TableRowColumn style={{ width: 180, paddingLeft: 10 }} >'adding UI-UX feature'</TableRowColumn>
        <TableRowColumn style={{ width: 120, paddingLeft: 10 }} >Trinity</TableRowColumn>
        <TableRowColumn style={{ width: 80, paddingLeft: 10 }} >Push</TableRowColumn>
        <TableRowColumn style={{ width: 274, paddingLeft: 10 }} >15 Nov 2012 05:34AM UTC</TableRowColumn>
        <TableRowColumn style={{ paddingLeft: 10 }} >Travis-CI</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn style={{ width: 90, paddingLeft: 10 }} >5</TableRowColumn>
        <TableRowColumn style={{ width: 100, paddingLeft: 10 }} >feature3</TableRowColumn>
        <TableRowColumn style={{ width: 130, paddingLeft: 10 }} >60%</TableRowColumn>
        <TableRowColumn style={{ width: 180, paddingLeft: 10 }} >'feature for animation'</TableRowColumn>
        <TableRowColumn style={{ width: 120, paddingLeft: 10 }} >Morpheus</TableRowColumn>
        <TableRowColumn style={{ width: 80, paddingLeft: 10 }} >Push</TableRowColumn>
        <TableRowColumn style={{ width: 274, paddingLeft: 10 }} >1 Dec 2012 05:34AM UTC</TableRowColumn>
        <TableRowColumn style={{ paddingLeft: 10 }} >Travis-CI</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
);

const stylePapers = {
  height: 70,
  width: 250,
  margin: 6,

  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: 'rgb(242, 243, 238)',
};

const stylePaperSubtitles = {
  fontSize: 10,
  margin: '20px 0px 10px 0px',
  fontFamily: 'Acme',
  color: grey600,
};

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBranch: 'Master',
      open: false,
    };
  }

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };


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
      <div style={{ marginTop: '80px' }}>
        <div style={{ height: 150, width: '95%', margin: '50px 0px 0px 30px' }} >
          <Divider
            style={{ backgroundColor: grey700, margin: '0px 58px 10px 37px', height: 4 }}
            inset={true} // eslint-disable-line
          />
          <Line
            data={(this.props.activeBranch.length === 0) ? this.props.sampleData : parseDatatoChart(this.props.activeBranch)}
            redraw={true} // eslint-disable-line
            width={200}
            height={200}
            options={options}
          />
        </div>
        <div style={{ margin: '30px 50px 80px 78px', textAlign: 'center', paddingLeft: 120, fontFamily: 'Acme' }}>
          <Paper style={stylePapers} zDepth={0}>
            <p style={stylePaperSubtitles}>REPO ADDED</p>
            <p>5 SEP 2012 02:17AM UTC</p>
          </Paper>
          <Paper style={stylePapers} zDepth={0}>
            <p style={stylePaperSubtitles}>TOTAL FILES</p>
            <p>15</p>
          </Paper>
          <Paper style={stylePapers} zDepth={0}>
            <p style={stylePaperSubtitles}># BUILDS</p>
            <p>30</p>
          </Paper>
          <Paper style={stylePapers} zDepth={0}>
            <p style={stylePaperSubtitles}>COVERAGE %</p>
            <p>83%</p>
          </Paper>
        </div>
        <Divider
          style={{ backgroundColor: grey700, marginLeft: 255, marginRight: 100, height: 2 }}
          inset={true} // eslint-disable-line
        />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceAround', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 255 }} >
            <h3 style={{ fontFamily: 'Acme', marginTop: 5, color: '#394f59' }}>LAST BUILD ON BRANCH {(this.state.selectedBranch).toUpperCase()} </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', float: 'right', position: 'absolute', right: 100 }} >
            <RaisedButton
              backgroundColor="#3d545e"
              onClick={this.handleClick}
              label="Branch"
              labelColor="#FAFAFA"
              labelStyle={{ fontSize: 12, fontFamily: 'Acme' }}
              icon={<CallSplit />}
              labelPosition="before"

              style={{ height: 28, marginTop: 5 }}
            />
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              onRequestClose={this.handleRequestClose}
            >
              <Menu>
                {this.createMenuItems()}
              </Menu>
            </Popover>
          </div>
        </div>

        <div
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceAround',
            position: 'relative', backgroundColor: '#c14f4f', height: 32, margin: '45px 100px 0px 255px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', padding: 7 }} >
            <h3 style={{ color: 'white', fontSize: 13 }}>COMMITED {'15 SEP 2012 - 5:34'}</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', padding: 7, float: 'right', position: 'absolute', right: 30 }} >
            <h3 style={{ color: 'white', fontSize: 13 }}>COVERAGE...</h3>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceAround', position: 'relative', height: 110, margin: '10px 100px 40px 255px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', padding: 7, width: 110, borderTop: '2px solid #c14f4f', marginRight: 20 }} >
            <p style={{ color: '#c14f4f', fontFamily: 'Acme', fontSize: 12 }}>BUILD # </p>
            <p style={{ marginTop: 10, fontSize: 12 }}>19</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', padding: 7, width: 158, borderTop: '2px solid #c14f4f', marginRight: 20 }} >
            <p style={{ color: '#c14f4f', fontFamily: 'Acme', fontSize: 12 }}>BUILD TYPE</p>
            <p style={{ marginTop: 10, fontSize: 12 }}>Push</p>
            <p style={{ marginTop: 4, fontSize: 12 }}>Travis-CI</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', padding: 7, width: 208, borderTop: '2px solid #c14f4f', marginRight: 20 }} >
            <p style={{ color: '#c14f4f', fontFamily: 'Acme', fontSize: 12 }}>COMMITED BY</p>
            <p style={{ marginTop: 10, fontSize: 12 }}>Neo</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', padding: 7, width: 248, borderTop: '2px solid #c14f4f', marginRight: 20 }} >
            <p style={{ color: '#c14f4f', fontFamily: 'Acme', fontSize: 12 }}>COMMIT MESSAGE</p>
            <p style={{ marginTop: 10, fontSize: 12 }}>'implementing super secret validation and tests'</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', padding: 7, width: 280, borderTop: '2px solid #c14f4f' }} >
            <p style={{ color: '#c14f4f', fontFamily: 'Acme', fontSize: 12 }}>RUN DETAILS</p>
            <p style={{ marginTop: 10, fontSize: 12 }}>202 of 318 relevant lines covered (63.52%)</p>

          </div>
        </div>
        <Divider
          style={{ backgroundColor: grey700, marginTop: 120, marginLeft: 250, marginRight: 100, height: 2 }}
          inset={true} // eslint-disable-line
        />
        <div>
          <div style={{ margin: '5px 100px 30px 255px' }} >
            <h3 style={{ fontFamily: 'Acme', marginTop: 5, color: '#394f59' }}>RECENT BUILDS</h3>
          </div>
          <div style={{ margin: '5px 100px 100px 255px' }} >
            <TableCommits />
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
