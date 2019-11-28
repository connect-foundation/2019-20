import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles(() => ({
  dealType: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid black',
    marginTop: '0.3rem',
  },
}));

const DealType = () => {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div className={classes.dealType}>
      <div>
        직거래
        <Radio
          checked={selectedValue === 'd'}
          onChange={handleChange}
          value='d'
          color='default'
          name='radio-button-demo'
          inputProps={{'aria-label': 'D'}}
        />
      </div>
      <div>
        택배거래
        <Radio
          checked={selectedValue === 'a'}
          onChange={handleChange}
          value='a'
          name='radio-button-demo'
          inputProps={{'aria-label': 'A'}}
        />
      </div>
    </div>
  );
};

export default DealType;
