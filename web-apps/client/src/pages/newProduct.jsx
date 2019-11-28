import React, {useState, createContext} from 'react';
import Header from '../components/header';
import ProductForm from '../components/productForm';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  productForm: {
    position: 'relative',
    minHeight: '100%',
  },
}));

export const ImageContext = createContext();

const NewProduct = () => {
  const classes = useStyles();
  const [images, setImages] = useState([]);

  return (
    <ImageContext.Provider value={{images, setImages}}>
      <Header />
      <ProductForm className={classes.productForm} />
    </ImageContext.Provider>
  );
};

export default NewProduct;
