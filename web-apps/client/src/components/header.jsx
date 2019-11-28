import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(() => ({
  headerButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar variant='dense' className={classes.headerButtons}>
          <ExitToAppIcon />
          <AddAPhotoIcon />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
