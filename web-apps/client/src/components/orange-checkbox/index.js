import React from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/CheckCircle';
import UnCheckedIcon from '@material-ui/icons/CheckCircleOutline';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import checkBoxStyles from './style';

const ColoredCheckBox = ({ label, onChange, checked }) => {
  const OrangeCheckbox = withStyles(checkBoxStyles)(Checkbox);

  return (
    <>
      <FormControlLabel
        onChangeCapture={onChange}
        control={(
          <OrangeCheckbox
            checked={checked}
            icon={<UnCheckedIcon />}
            checkedIcon={<CheckIcon />}
          />
        )}
        label={label}
      />
    </>
  )
};

ColoredCheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

ColoredCheckBox.defaultProps = {
  onChange: () => { },
  checked: false,
};

export default ColoredCheckBox;
