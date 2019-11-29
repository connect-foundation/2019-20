import React from 'react';
import GoBackIcon from '@material-ui/icons/ArrowBackRounded';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    height: '2.4rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0.1rem',
  },
  titleBackground: {
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    '& h2': {
      fontWeight: 'bold',
      fontSize: '0.9rem'
    }
  }
});

const Header = ({ title }) => {
  const classes = useStyles({});
  return (
    <AppBar position='static' className={classes.header} color='white'>
      <GoBackIcon />
      <div className={classes.titleBackground}>
        <h2>{title}</h2>
      </div>
    </AppBar>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;