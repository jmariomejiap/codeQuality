import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/svg-icons/navigation/menu';
import Settings from 'material-ui/svg-icons/action/settings';
import { grey900, transparent } from 'material-ui/styles/colors';

import FlatButton from 'material-ui/FlatButton';
import CallSplit from 'material-ui/svg-icons/communication/call-split';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';


const style = {
  appBar: {
    position: 'fixed !important',
    top: 0,
    overflow: 'hidden',
    maxHeight: 63,
    border: transparent,
    backgroundColor: transparent,
  },
  menuButton: {
    marginLeft: 10,
  },
  iconsRightContainer: {
    marginRight: 20,
    position: 'absolute',
  },
  labels: {
    paddingTop: 15,

  },
};


class RightElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBranch: 'Master',
      popOverOpen: false,
    };
  }

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      popOverOpen: !this.state.popOverOpen,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose() {
    this.setState({
      popOverOpen: false,
    });
  }

  handleSelectedBranch(name) {
    this.setState({ selectedBranch: name });
    this.props.selectBranch(name);
  }

  createMenuItems() {
    const branchesList = this.props.branches;
    return branchesList.map((name) => {
      return <MenuItem key={name} primaryText={name} onClick={() => this.handleSelectedBranch(name)} />;
    });
  }

  render() {
    return (
      <Toolbar style={{ backgroundColor: transparent }}>
        <ToolbarGroup>
          <ToolbarTitle text={'Project1'} style={{ color: '#394f59', fontFamily: 'Acme', fontSize: 19 }} />
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <IconMenu
            color={grey900}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            iconButtonElement={
              <FlatButton
                label={`Branch ${this.state.selectedBranch}`}
                labelStyle={{ fontFamily: 'Acme', color: '#394f59', fontSize: 19, textTransform: 'none' }}
                icon={<CallSplit color={'#394f59'} />}
                hoverColor={transparent}
                labelPosition="after"
                style={{ marginTop: 0 }}
              />
            }
          >
            {this.createMenuItems()}
          </IconMenu>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <IconMenu
            color={'#394f59'}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            iconButtonElement={
              <IconButton>
                <Settings color={'#394f59'} />
              </IconButton>
            }
          >
            <MenuItem style={style.labels} primaryText="Settings" containerElement={<Link to="/settings" />} />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

const Header = (props) => {
  const { styles, handleDrawer, branches, selectBranch, activeBranch } = props;

  return (
    <div>
      <AppBar
        title="Code Quality"
        titleStyle={{ color: '#394f59', fontFamily: 'Bangers', fontSize: 30 }}
        style={{ ...styles, ...style.appBar }}
        iconElementLeft={
          <IconButton style={style.menuButton} onClick={handleDrawer}>
            <Menu color={'#394f59'} />
          </IconButton>
        }
        iconElementRight={
          <RightElements
            branches={branches}
            selectBranch={selectBranch}
            activeBranch={activeBranch}

          />
        }
      />
    </div>
  );
};

Header.propTypes = {
  styles: PropTypes.object,
  handleDrawer: PropTypes.func,
  branches: PropTypes.array,
  selectBranch: PropTypes.func,
  activeBranch: PropTypes.array,
};

RightElements.propTypes = {
  branches: PropTypes.array,
  selectBranch: PropTypes.func,
  activeBranch: PropTypes.array,
};

export default Header;
