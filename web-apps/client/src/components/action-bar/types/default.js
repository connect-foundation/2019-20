import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import convertIconButtons from '../convert-icon-button';
import useStyle from '../style';

const DefaultToolBar = ({ title, buttons = [], leftArea = (<></>) }) => {
  const classes = useStyle({});
  const IconButtons = buttons.map(convertIconButtons);

  return (
    <>
      {leftArea}
      <Typography align='center' variant='subtitle1'>
        <strong>
          {title}
        </strong>
      </Typography>
      <Grid className={classes.rightButtons}>
        {IconButtons}
      </Grid>
    </>
  )
};

DefaultToolBar.propTypes = {
  title: PropTypes.node.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object),
  leftArea: PropTypes.node,
};

DefaultToolBar.defaultProps = {
  buttons: [],
  leftArea: (<></>),
};

export default DefaultToolBar;
