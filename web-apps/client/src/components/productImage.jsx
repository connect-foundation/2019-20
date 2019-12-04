import React, {useContext} from 'react';
import {ImageContext} from '../contexts/imageStore';
import {makeStyles} from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {deletePicture} from '../utils/apiCall';

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

const ProductImage = ({mobile, name, deskTop}) => {
  const classes = useStyles();
  const {setImages, fileDelimiter, mobileDesktopDelimiter} = useContext(
    ImageContext,
  );

  const onDelete = async () => {
    const mobileKey = mobile.split('/').slice(-1)[0];
    const deskTopKey = deskTop.split('/').slice(-1)[0];

    const storageData = window.localStorage.getItem('images');
    const storageImage = storageData.split(fileDelimiter).slice(0, -1);

    try {
      await deletePicture(mobileKey, deskTopKey);

      if (storageImage[0].length && storageImage[0] !== 'loading') {
        const deleted = storageImage.filter((image) => {
          const mobileImg = image.split(mobileDesktopDelimiter)[0];
          if (mobileImg !== mobile) {
            return image;
          }
        });

        const result = deleted.reduce((acc, cur) => {
          return acc + cur + ' ';
        }, '');
        window.localStorage.setItem('images', result);

        const filteredImage = deleted.map((img) => {
          const split = img.split('$$');
          const mobileImg = split[0];
          const deskTopImg = split[1];
          return {
            mobile: mobileImg,
            deskTop: deskTopImg,
            loading: false,
          };
        });

        setImages(filteredImage);
      }
    } catch (err) {}
  };

  return (
    <div className={classes.imageContainer}>
      <HighlightOffIcon className={classes.removeBtn} onClick={onDelete} />
      <img alt={name} src={mobile} className={classes.productImg} />
    </div>
  );
};

export default ProductImage;
