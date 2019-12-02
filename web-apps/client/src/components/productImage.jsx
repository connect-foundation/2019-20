import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    position: 'relative',
  },
  productImg: {
    width: '2.5rem',
    height: '2.5rem',
    border: '1px solid black',
    borderRadius: '10px',
    margin: '0.2rem 0.25rem',
    top: '0.2rem',
  },
}));

const ProductImage = ({image}) => {
  const classes = useStyles();
  return (
    <div className={classes.imageContainer}>
      <img alt={image.name} src={image.uri} className={classes.productImg} />
    </div>
  );
};

export default ProductImage;
