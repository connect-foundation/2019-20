import React from 'react';
import PropTypes from 'prop-types';
import { Slide, Paper } from '@material-ui/core';
import useStyles from './style';

const SlideUpSnackbar = ({ open, message, duration, bottom }) => {
  const classes = useStyles({ bottom });

  return (
    <Slide direction="up" in={open} timeout={duration}>
      <Paper elevation={24} square className={classes.root}>
        <div>{message}</div>
      </Paper>
    </Slide>
  )
};

SlideUpSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  bottom: PropTypes.string,
};

SlideUpSnackbar.defaultProps = {
  bottom: '0px',
};

export default SlideUpSnackbar;
