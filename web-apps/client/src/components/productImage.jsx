import React, {useContext} from 'react';
import {ImageContext} from '../contexts/imageStore';
import {makeStyles} from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    position: 'relative',
  },
  removeBtn: {
    position: 'absolute',
    left: '1.8rem',
    top: '-0.2rem',
    background: 'gray',
    color: 'white',
    borderRadius: '1rem',
    '&:hover': {
      background: 'powderblue',
    },
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

const ProductImage = ({uri, name}) => {
  const classes = useStyles();
  const {images, setImages} = useContext(ImageContext);

  const onDelete = (e) => {};

  return (
    <div className={classes.imageContainer}>
      <HighlightOffIcon className={classes.removeBtn} onClick={onDelete} />
      <img alt={name} src={uri} className={classes.productImg} />
    </div>
  );
};

export default ProductImage;
