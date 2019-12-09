import React, {useState, useEffect, useContext} from 'react';
import {ProductContext} from '../contexts/productStore';
import Loading from './loading';
import ProductImage from './productImage';
import {makeStyles} from '@material-ui/core';

const useStyle = makeStyles(() => ({
  container: {
    width: '13rem',
    height: '4.2rem',
    display: 'flex',
    alignItems: 'center',
    overflowX: 'scroll',
    overflowY: 'hidden',
    marginTop: '0.3rem',
  },
}));

const ImageList = () => {
  const classes = useStyle();
  const {images, fileDelimiter, mobileDesktopDelimiter} = useContext(
    ProductContext,
  );
  const [imageList, setImageList] = useState('');

  const buildImageList = (images, storage) => {
    let result = '';

    if (images.length) {
      if (images[0].loading) {
        result = <Loading />;
      } else if (!images[0].loading) {
        result = images.map((image, index) => (
          <ProductImage
            key={index}
            mobile={image.mobile}
            name={image.name}
            deskTop={image.deskTop}
          />
        ));
      }
    } else if (storage !== null) {
      const storageImage = storage.split(fileDelimiter).slice(0, -1);
      if (storageImage[0] === 'loading') {
        result = <Loading />;
      } else {
        result = storageImage.map((image, index) => {
          const [mobile, deskTop] = image.split(mobileDesktopDelimiter);
          return <ProductImage key={index} mobile={mobile} deskTop={deskTop} />;
        });
      }
    }

    return result;
  };

  useEffect(() => {
    const storageData = window.localStorage.getItem('images');
    const newImageList = buildImageList(images, storageData);
    setImageList(newImageList);
  }, [images]);

  return <div className={classes.container}>{imageList}</div>;
};

export default ImageList;
