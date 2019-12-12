import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  skipButton: {
    width: '10rem',
    color: '#1db000',
    background: '#98FB98',
  },
}));

const SkipLogInButton = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button className={classes.skipButton} variant='contained'>
        구경만 할래요
      </Button>
    </div>
  );
};

export default SkipLogInButton;
