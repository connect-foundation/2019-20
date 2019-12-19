import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckCircle';
import UnCheckedIcon from '@material-ui/icons/CheckCircleOutline';

const CheckboxFormControl = ({ label, onChange, checked }) => {
  const onChangeEvent = (event) => {
    const checkState = event.target.checked;
    onChange(event, checkState, label);
  };
  return (
    <FormControlLabel
      onChange={onChangeEvent}
      control={(
        <Checkbox
          checked={checked}
          color='primary'
          icon={<UnCheckedIcon />}
          checkedIcon={<CheckIcon />}
        />
      )}
      label={(
        <Typography color='primary'>
          {label}
        </Typography>
      )}
    />
  )
};

CheckboxFormControl.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

CheckboxFormControl.defaultProps = {
  onChange: () => { },
  checked: false,
};

export default CheckboxFormControl;
