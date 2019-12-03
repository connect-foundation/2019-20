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
      imageList = images.map((image, index) => (
        <ProductImage
          key={index}
          mobile={image.mobile}
          name={image.name}
          deskTop={image.deskTop}
        />
      ));
    }
  } else if (storageData !== null) {
    const storageImage = storageData.split(' ').slice(0, -1);
    if (storageImage[0] === 'loading') {
      imageList = <Loading />;
    } else {
      imageList = storageImage.map((image, index) => {
        const uris = image.split('$$');
        const mobile = uris[0];
        const deskTop = uris[1];
        return <ProductImage key={index} mobile={mobile} deskTop={deskTop} />;
      });
    }
  }

  return <div className={classes.container}>{imageList}</div>;
};

export default ImageList;
