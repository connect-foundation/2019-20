import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  price: {
    display: 'flex',
    width: '13rem',
  },
  negotiable: {
    fontSize: '0.6rem',
    width: '8rem',
  },
}));

const PriceField = () => {
  const classes = useStyles();
  const [negotiable, setNegotiable] = useState(false);

  const onChangeNegotiable = () => {
    setNegotiable(!negotiable);
  };

  return (
    <div className={classes.price}>
      <TextField id='standard-basic' label='가격(원)' />
      <div className={classes.negotiable}>
        <Checkbox
          checked={negotiable}
          onChange={onChangeNegotiable}
          value='checkedB'
          color='primary'
        />
        <span>제안 받기</span>
      </div>
    </div>
  );
};

export default PriceField;
