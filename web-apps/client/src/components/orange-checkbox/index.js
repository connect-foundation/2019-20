import React from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/CheckCircle';
import UnCheckedIcon from '@material-ui/icons/CheckCircleOutline';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import checkBoxStyles from './style';

const ColoredCheckBox = ({ label, inputRef, onChange = (() => { }) }) => {
  const OrangeCheckbox = withStyles(checkBoxStyles)(Checkbox);
  return (
    <>
      <FormControlLabel
        control={(
          <OrangeCheckbox
            icon={<UnCheckedIcon />}
            checkedIcon={<CheckIcon />}
            label={label}
            inputRef={inputRef}
            onChnage={onChange}
          />
        )}
        label={label}
      />
    </>
  )
};

ColoredCheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  inputRef: PropTypes.element.isRequired,
  onChange: PropTypes.func,
};

ColoredCheckBox.defaultProps = {
  onChange: () => { },
};

export default ColoredCheckBox;
