import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    '& > div': {
      width: '100%',
    }
  },
  description: {
    textAlign: 'center',
  },
  subDescription: {
    textAlign: 'center',
    color: '#97989a',
  },
});

const Field = ({ description, subscription, field }) => {
  const classes = useStyles({});
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      spacing={1}
      className={classes.root}
    >
      <Grid item className={classes.description}>
        {description}
      </Grid>
      <Grid item className={classes.subDescription}>
        {subscription}
      </Grid>
      <Grid item>
        {field}
      </Grid>
    </Grid>
  )
};

Field.propTypes = {
  description: PropTypes.string.isRequired,
  subscription: PropTypes.string,
  field: PropTypes.element.isRequired,
};

Field.defaultProps = {
  subscription: '',
};

export default Field;
