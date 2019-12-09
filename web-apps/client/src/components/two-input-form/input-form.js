import React from 'react';
import PropTypes from 'prop-types';
import { Grid, InputBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const inputStyles = {
  root: {
    borderRadius: '0.5rem',
    border: '1px solid #97989a',
  },
  input: {
    padding: '0.5rem',
  }
};

const InputForm = ({ xs, inputRef, placeholder }) => {
  const RadiusInput = withStyles(inputStyles)(InputBase);
  return (
    <Grid item xs={xs}>
      <RadiusInput fullWidth inputRef={inputRef} placeholder={placeholder} />
    </Grid>
  );
};

InputForm.propTypes = {
  xs: PropTypes.number.isRequired,
  inputRef: PropTypes.shape({ inputRef: PropTypes.instanceOf(React.Component) }).isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default InputForm;
