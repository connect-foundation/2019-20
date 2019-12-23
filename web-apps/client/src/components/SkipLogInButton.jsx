import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  skipButton: {
    width: '12rem',
    color: '#1db000',
    background: '#98FB98',
  },
  link: {
    textDecoration: 'none',
  },
}));

const SkipLogInButton = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link to='/service/main' className={classes.link}>
        <Button className={classes.skipButton} variant='contained'>
          구경만 할래요
        </Button>
      </Link>
    </div>
  );
};

export default SkipLogInButton;
