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

  const alertMsg = '이미지를 등록하는데 실패했습니다.';

  return (
    <ImageStore>
      <Header />
      <ProductForm className={classes.productForm} />
      <AlertDialog msg={alertMsg} />
    </ImageStore>
  );
};

export default NewProduct;
