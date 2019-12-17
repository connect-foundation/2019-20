import React from 'react';
import PropTypes from 'prop-types';
import { Slide, Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: ({ bottom, palette: { primary } }) => ({
    width: '100%',
    height: '10vh',
    position: 'fixed',
    bottom,
    backgroundColor: primary.main,
    color: 'white',
    '& > div': {
      padding: '1rem',
    },
    zIndex: 10,
  }),
});

const SnackBar = ({ open, message, bottom }) => {
  const classes = useStyles({ bottom, ...useTheme() });

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Paper elevation={24} square className={classes.root}>
        <div>{message}</div>
      </Paper>
    </Slide>
  )
};

SnackBar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  bottom: PropTypes.string,
};

SnackBar.defaultProps = {
  bottom: '0px',
};

export default SnackBar;
