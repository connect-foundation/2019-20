import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from './IconButon';

const useStyles = makeStyles({
  rightButtons: { flexGrow: 1, textAlign: 'right' },
  toolbar: { flexGrow: 1 },
});


const convertIconButtons = (button, index, buttons) => {
  const Button = (
    <IconButton
      key={button.name}
      icon={button.icon}
      onClick={button.onClick}
      index={index}
      length={buttons.length}
    />
  );
  if (!button.href) {
    return Button;
  }
  return (
    <Link to={button.href} key={button.name}>
      {Button}
    </Link>
  );
};

const ActionBar = ({ leftArea, title, buttons }) => {
  const classes = useStyles({});
  const IconButtons = buttons.map(convertIconButtons);
  return (
    <AppBar position='sticky' color='inherit'>
      <Toolbar className={classes.toolbar}>
        {leftArea}
        <Typography align='center' variant='subtitle1'>
          <strong>
            {title}
          </strong>
        </Typography>
        <Grid className={classes.rightButtons}>
          {IconButtons}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

ActionBar.propTypes = {
  title: PropTypes.node.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.node,
    onClick: PropTypes.func,
  })),
  leftArea: PropTypes.node,
};

ActionBar.defaultProps = {
  buttons: [],
  leftArea: (<></>),
};

export default ActionBar;
