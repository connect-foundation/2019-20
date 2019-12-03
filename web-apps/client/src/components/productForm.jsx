import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useFetch from '../hooks/useFetch';

import Drawer from './drawer';
import DealType from './dealType';
import ImageList from './imageList';
import PriceField from './priceField';

const useStyles = makeStyles(() => ({
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
    height: '15rem',
  },
  category: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid black',
    marginTop: '1rem',
  },
  contents: {
    marginTop: '0.2rem',
    height: '5rem',
    width: '13rem',
    border: '1px solid #999',
    resize: 'none',
  },
  submitButton: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    display: 'block',
    color: 'white',
    background: '#aaa',
    '&:hover': {
      background: 'powderblue',
    },
  },
}));

const ProductForm = () => {
  const classes = useStyles();
  const [category, setCategory] = useState([]);
  const [statusTypeList, setStatusTypeList] = useState([]);

  const categoryAPI = 'category';
  const statusTypeListAPI = 'statusType';

  const loadCategory = useFetch(categoryAPI, setCategory);
  const loadStatusType = useFetch(statusTypeListAPI, setStatusTypeList);

  const submitListener = (evt) => {
    evt.preventDefault();
    //collect data
    //send to post:/products
  };
  return (
    <div className={classes.formContainer}>
      <form>
        <TextField id='standard-basic' label='제품명' />
        <Drawer name='카테고리' data={category} loading={loadCategory} />
        <Drawer
          name='제품상태'
          data={statusTypeList}
          loading={loadStatusType}
        />
        <DealType />
        <PriceField />
        <ImageList />
        <textarea
          className={classes.contents}
          placeholder='물품에 대해 소개해 주세요'
        />
        <Button
          variant='contained'
          type='submit'
          className={classes.submitButton}
          onClick={submitListener}
        >
          등록
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
