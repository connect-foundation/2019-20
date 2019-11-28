import React from 'react';
import Header from '../components/header';
import ProductForm from '../components/productForm';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  productForm: {
    position: 'relative',
    minHeight: '100%',
  },
}));
const NewProduct = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <ProductForm className={classes.productForm} />
    </>
  );
};

export default NewProduct;
