import React, {useContext} from 'react';
import {ImageContext} from '../contexts/Image';
import {AlertMessageContext} from '../contexts/AlertMessage';
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
  const {images, setImages} = useContext(ImageContext);
  const {dispatchMessage, ALERT_ACTION_TYPE} = useContext(AlertMessageContext);

  const onDelete = async () => {
    const mobileKey = mobile.split('/').slice(-1)[0];
    const deskTopKey = deskTop.split('/').slice(-1)[0];

    const deleteImageErrorMessage =
      '사진을 삭제할 수 없습니다. 잠시후 다시 시도해 주세요.';

    try {
      await deletePicture(mobileKey, deskTopKey);

      const imageList = images.filter((image) => image.mobile !== mobile);
      setImages(imageList);
    } catch (err) {
      dispatchMessage({
        type: ALERT_ACTION_TYPE.ERROR,
        payload: deleteImageErrorMessage,
      });
    }
  };

  return (
    <div className={classes.imageContainer}>
      <HighlightOffIcon className={classes.removeBtn} onClick={onDelete} />
      <img alt={name} src={mobile} className={classes.productImg} />
    </div>
  );
};

export default ProductImage;
