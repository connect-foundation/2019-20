import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioButton from './RadioButton';

const useStyles = makeStyles(() => ({
  radioGroup: {
    marginTop: '0.3rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const DealType = ({onDealTypeChange}) => {
  const classes = useStyles();

  const onRadioButtonChange = (e) => {
    onDealTypeChange(e.target.value);
  };

  return (
    <RadioGroup
      defaultValue='직거래'
      aria-label='거래유형'
      name='customized-radios'
      className={classes.radioGroup}
      onChange={onRadioButtonChange}
    >
      <FormControlLabel
        value='택배거래'
        control={<RadioButton />}
        label='택배거래'
      />
      <FormControlLabel
        value='직거래'
        control={<RadioButton />}
        label='직거래'
      />
    </RadioGroup>
  );
};

export default DealType;
