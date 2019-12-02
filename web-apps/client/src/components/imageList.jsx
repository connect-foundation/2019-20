import React, {useContext} from 'react';
import {ImageContext} from '../contexts/imageStore';
import Loading from './loading';
import ProductImage from './productImage';
import {makeStyles} from '@material-ui/core';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const useStyle = makeStyles(() => ({
  container: {
    marginTop: '0.2rem',
    background: '#eee',
    display: 'flex',
    alignItems: 'center',
  },
  carousel: {
    height: '3rem',
    padding: '0 1.5rem 0 1.5rem',
    width: '10rem',
  },
}));

const ImageList = () => {
  const classes = useStyle();
  const {images} = useContext(ImageContext);

  let imageList = '';
  if (images.length && !images[0].loading) {
    imageList = images.map((image) => <ProductImage image={image} />);
  } else if (images.length && images[0].loading) {
    imageList = <Loading />;
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className={classes.container}>
      <div className={classes.carousel}>
        <Slider {...settings}>{imageList}</Slider>
      </div>
    </div>
  );
};

export default ImageList;
