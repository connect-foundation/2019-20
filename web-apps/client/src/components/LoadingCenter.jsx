import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '80vh',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  message: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  }
});

const Loading = ({ message }) => {
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <div className={classes.message}>
        <CircularProgress disableShrink thickness={10} />
        <div>
          {message.length > 0 ? message : '데이터를 읽어 오고 있습니다.'}
        </div>
      </div>
    </div>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
};

Loading.defaultProps = {
  message: '',
};

export default Loading;
