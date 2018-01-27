import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Equalizer from 'material-ui/svg-icons/av/equalizer';
import { white, blue800 } from 'material-ui/styles/colors';

import { Bar } from 'react-chartjs-2';


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


const BarChart = (props) => {
  const { barGraph } = props;

  return (
    <div >
      <Paper style={style.paperChart} zDepth={2}>
        <AppBar
          title="Activity"
          showMenuIconButton={false}
          style={{ height: 58, backgroundColor: blue800, textAlign: 'left', zIndex: 100 }}
          titleStyle={{ fontSize: 18, color: white }}
          iconElementRight={
            <IconButton>
              <Equalizer color={white} />
            </IconButton>
          }
        />
        <div style={{ backgroundColor: white, height: '100%', padding: 50 }} >
          <Bar
            data={barGraph.data}
            width={100}
            height={50}
            options={barGraph.options}
            redraw={true} // eslint-disable-line
          />
        </div>
      </Paper>
    </div>
  );
};

BarChart.propTypes = {
  barGraph: PropTypes.object,
};

export default BarChart;
