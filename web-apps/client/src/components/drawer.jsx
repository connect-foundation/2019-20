import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(() => ({
  fullList: {
    width: 'auto',
    height: '15rem',
  },
  field: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid black',
    marginTop: '1rem',
  },
}));

const Drawer = ({name, data, loading}) => {
  const classes = useStyles();
  const [state, setState] = useState({
    bottom: false,
  });

  const toggleDrawer = (side, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({...state, [side]: open});
  };

  const list = (side) => {
    if (loading) {
      return 'loading';
    }
    return (
      <div
        className={classes.fullList}
        role='presentation'
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
        <List>
          {data.map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
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
        {list('bottom')}
      </SwipeableDrawer>
    </>
  );
};

export default Drawer;
