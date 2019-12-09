import React from 'react';
import Header from '../components/header';
import ProductForm from '../components/productForm';
import ProductStore from '../contexts/productStore';
import {makeStyles} from '@material-ui/core/styles';
import AlertDialog from '../components/alertDialog';

const useStyles = makeStyles(() => ({
  productForm: {
    position: 'relative',
    minHeight: '100%',
  },
}));

const NewProduct = () => {
  const classes = useStyles();

  return (
    <ProductStore>
      <Header />
      <ProductForm className={classes.productForm} />
      <AlertDialog />
    </ProductStore>
  );
};

export default NewProduct;
