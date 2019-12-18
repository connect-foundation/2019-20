import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  fullList: {
    width: 'auto',
    height: '15rem',
  },
}));

const DrawerList = ({loading, side, data, onDrawerSelected, toggleDrawer}) => {
  const classes = useStyles();

  const onListClick = (e) => {
    const name = e.target.textContent;
    onDrawerSelected(name);
  };

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
          <ListItem button key={text} onClick={onListClick}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DrawerList;
