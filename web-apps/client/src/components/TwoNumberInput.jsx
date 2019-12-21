import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';

import RadiusInput from './RadiusInput';

const Form = ({ holders }, ref) => {
  const inputRefs = [useRef(null), useRef(null)];

  useImperativeHandle(ref, () => ({
    get: () => inputRefs.map((element) => +(element.current.value)),
    set: (...rest) => rest.forEach((value, i) => {
      if (!Number.isNaN(+value) && value) {
        inputRefs[i].current.value = +value;
      }
    }),
    clear: () => inputRefs.forEach((element) => {
      // eslint-disable-next-line no-param-reassign
      element.current.value = '';
    }),
  }));

  const customInputComponent = Array.from(Array(2)).map((_, i) => (
    <RadiusInput
      inputRef={inputRefs[i] || null}
      placeholder={holders.length > i ? holders[i] : ''}
      type='number'
    />
  ));

  return (
    <Grid container justify='center' direction='row'>
      <Grid xs={5}>
        {customInputComponent[0]}
      </Grid>
      <Grid xs={2}>
        <Typography align='center'>~</Typography>
      </Grid>
      <Grid xs={5}>
        {customInputComponent[1]}
      </Grid>
    </Grid>
  )
};

Form.propTypes = {
  holders: PropTypes.arrayOf(PropTypes.string),
};

Form.defaultProps = {
  holders: ['', ''],
};

export default forwardRef(Form);
