import React, {useState, useEffect, useContext} from 'react';
import {ImageContext} from '../contexts/ImageStore';
import Loading from './loading';
import ProductImage from './productImage';
import {makeStyles} from '@material-ui/core';

const useStyle = makeStyles(() => ({
  container: {
    width: '13rem',
    height: '4.2rem',
    display: 'flex',
    alignItems: 'center',
    overflowX: 'auto',
    overflowY: 'hidden',
    marginTop: '0.3rem',
    color: '#555',
  },
}));

const ImageList = () => {
  const classes = useStyle();
  const {images} = useContext(ImageContext);
  const [imageList, setImageList] = useState('');

  const buildImageList = (images) => {
    let result = '';

    if (images.length) {
      result = images.map((image, index) => {
        if (!image.loading) {
          return (
            <ProductImage
              key={index}
              mobile={image.mobile}
              name={image.name}
              deskTop={image.deskTop}
            />
          );
        } else {
          return <Loading key={index} />;
        }
      });
    } else if (images.length === 0) {
      result = '사진을 등록해 주세요';
    } else {
      throw new Error('image context is not an array!!!');
    }

    return result;
  };

  useEffect(() => {
    const newImageList = buildImageList(images);
    setImageList(newImageList);
  }, [images]);

  return <div className={classes.container}>{imageList}</div>;
};

export default ImageList;
