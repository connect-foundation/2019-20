import React from 'react';
import Header from '../components/header';
import ProductForm from '../components/productForm';
import ImageStore from '../contexts/imageStore';
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
    <ImageStore>
      <Header />
      <ProductForm className={classes.productForm} />
      <AlertDialog />
    </ImageStore>
  );
};

export default NewProduct;
