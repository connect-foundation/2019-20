import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import AddPicture from './AddPicture';
import GoBackButton from './GoBackButton';

const useStyles = makeStyles(() => ({
  root: {
    height: '2.5rem',
  },
  headerButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    background: 'white',
    color: '#555',
  },
}));

const WriteHeader = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar variant='dense' className={classes.headerButtons}>
          <GoBackButton />
          중고거래 글쓰기
          <AddPicture />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default WriteHeader;
