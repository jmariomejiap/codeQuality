import React, { PropTypes } from 'react';
import parseDatatoChart from '../../../../util/parseDataToChart';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Timeline from 'material-ui/svg-icons/action/timeline';
import { white, grey400 } from 'material-ui/styles/colors';

import { Line } from 'react-chartjs-2';

const style = {
  paperChart: {
    height: 350,
    width: '70%',
    backgroundColor: white,
    marginTop: 100,
    marginBottom: 100,
    marginLeft: 200,
    display: 'inline-block',
  },
};


const LineChart = (props) => {
  const { activeBranch, sampleData } = props;

  const createMenuItems = () => {
    const branchesList = props.branches;
    return branchesList.map((name) => {
      return <MenuItem key={name} primaryText={name} onClick={() => props.selectBranch(name)} />;
    });
  };


  return (
    <div>
      <div >
        <Paper style={style.paperChart} zDepth={2}>
          <AppBar
            title="Branches"
            showMenuIconButton={false}
            style={{ height: 58, backgroundColor: '#23938c', textAlign: 'left', zIndex: 100 }}
            titleStyle={{ fontSize: 18, color: white }}
            iconElementRight={
              <IconMenu
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                iconButtonElement={
                  <IconButton>
                    <Timeline color={grey400} />
                  </IconButton>
                }
              >
                <MenuItem primaryText={"All"} onClick={() => props.selectBranch('all')} />
                {createMenuItems()}
              </IconMenu>
            }
          />
          <div style={{ backgroundColor: white, height: '100%', padding: 50 }} >
            <Line
              data={(activeBranch.length === 0) ? sampleData : parseDatatoChart(activeBranch)}
              redraw={true} // eslint-disable-line
              width={100}
              height={50}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </Paper>
      </div>
    </div>
  );
};

LineChart.propTypes = {
  branches: PropTypes.array,
  selectBranch: PropTypes.func,
  activeBranch: PropTypes.array,
};

export default LineChart;
