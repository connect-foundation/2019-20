import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputForm from './input-form';

const useStyles = makeStyles({
  rangeSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSection: {
    display: 'flex',
    margin: '0.5rem 0 0 0',
    justifyContent: 'flex-end',
  }
});

const Form = ({ inputStartRef, inputEndRef, submitEvent, startHolder, endHolder }) => {
  const classes = useStyles({});

  return (
    <Grid container justify='center'>
      <Grid container justify='center'>
        <InputForm xs={5} inputRef={inputStartRef} placeholder={startHolder} />
        <Grid item xs={1} className={classes.rangeSection}>~</Grid>
        <InputForm xs={5} inputRef={inputEndRef} placeholder={endHolder} />
      </Grid>
      <Grid container justify='flex-end'>
        <Grid item xs={5} className={classes.buttonSection}>
          <Button variant="contained" color="secondary" onClick={submitEvent}>적용</Button>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Grid>
  )
};

Form.propTypes = {
  submitEvent: PropTypes.func.isRequired,
  startHolder: PropTypes.string,
  endHolder: PropTypes.string,
  inputStartRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  inputEndRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired
}

Form.defaultProps = {
  startHolder: '',
  endHolder: '',
}

export default Form;
