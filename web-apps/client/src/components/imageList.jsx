import React, {useContext} from 'react';
import {ImageContext} from '../contexts/imageStore';
import Loading from './loading';
import ProductImage from './productImage';
import {makeStyles} from '@material-ui/core';

const useStyle = makeStyles(() => ({
  container: {
    width: '13rem',
    height: '3.5rem',
    display: 'flex',
    alignItems: 'center',
    overflowX: 'scroll',
    overflowY: 'hidden',
    margin: '0.4rem 0 0.1rem 0',
  },
}));

const ImageList = () => {
  const classes = useStyle();
  const {images} = useContext(ImageContext);

  let imageList = '';
  const storageData = window.localStorage.getItem('images');

  if (images.length) {
    if (images[0].loading) {
      imageList = <Loading />;
    } else if (!images[0].loading) {
      imageList = images.map((image) => (
        <ProductImage uri={image.uri} name={image.name} />
      ));
    }
  } else if (storageData !== null) {
    const storageImage = storageData.split(' ').slice(0, -1);
    if (storageImage[0] === 'loading') {
      imageList = <Loading />;
    } else {
      imageList = storageImage.map((image) => {
        return <ProductImage uri={image} />;
      });
    }
  }

  return <div className={classes.container}>{imageList}</div>;
};

export default ImageList;
