import React from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Timeline from 'material-ui/svg-icons/action/timeline';
import Equalizer from 'material-ui/svg-icons/av/equalizer';
import { white, grey400, cyan400, red800 } from 'material-ui/styles/colors';


const DashboardContainers = () => {
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

  return (
    <div>
      <div >
        <Paper style={style.paperChart} zDepth={2}>
          <AppBar
            title="Branches"
            showMenuIconButton={false}
            style={{ height: 58, backgroundColor: cyan400, textAlign: 'left' }}
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
                <MenuItem primaryText="Master" />
                <MenuItem primaryText="Feature1" />
                <MenuItem primaryText="hot-fix" />
                <MenuItem primaryText="develop" />
                <MenuItem primaryText="fixing-bug" />
                <MenuItem primaryText="feature2" />
              </IconMenu>
            }
          />
          <div style={{ backgroundColor: white, height: '100%', padding: 50 }} >chart place holder</div>
        </Paper>
      </div>

      <div >
        <Paper style={style.paperChart} zDepth={2}>
          <AppBar
            title="Activity"
            showMenuIconButton={false}
            style={{ height: 58, backgroundColor: red800, textAlign: 'left' }}
            titleStyle={{ fontSize: 18, color: white }}
            iconElementRight={
              <IconMenu
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                iconButtonElement={
                  <IconButton>
                    <Equalizer color={grey400} />
                  </IconButton>
                }
              />
            }
          />
          <div style={{ backgroundColor: white, height: '100%', padding: 50 }} >maybe an area to display Activity</div>
        </Paper>
      </div>
    </div>
  );
};

export default DashboardContainers;
