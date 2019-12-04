import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DrawerList from './drawerList';

const useStyles = makeStyles(() => ({
  field: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid black',
    marginTop: '1rem',
  },
}));

const Drawer = ({name, data, loading, onDrawerSelected}) => {
  const classes = useStyles();
  const [state, setState] = useState({
    bottom: false,
  });

  const toggleDrawer = (side, open) => (event) => {
    const isTabOrShift = (evt) => {
      if (
        evt &&
        evt.type === 'keydown' &&
        (evt.key === 'Tab' || evt.key === 'Shift')
      ) {
        return true;
      } else {
        return false;
      }
    };

    if (isTabOrShift(event)) {
      return;
    }

    setState({...state, [side]: open});
  };

  return (
    <>
      <div onClick={toggleDrawer('bottom', true)} className={classes.field}>
        <div>{name}</div>
        <ExpandMoreIcon />
      </div>
      <SwipeableDrawer
        anchor='bottom'
        open={state.bottom}
        onClose={toggleDrawer('bottom', false)}
        onOpen={toggleDrawer('bottom', true)}
      >
        <DrawerList
          loading={loading}
          side='bottom'
          data={data}
          onDrawerSelected={onDrawerSelected}
          toggleDrawer={toggleDrawer}
        />
      </SwipeableDrawer>
    </>
  );
};

export default Drawer;
