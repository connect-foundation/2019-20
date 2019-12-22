import React, {useState, useContext, useRef} from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {makeStyles} from '@material-ui/core/styles';

import {ImageContext} from '../contexts/Image';
import {AlertMessageContext} from '../contexts/AlertMessage';

import useImageUpload from '../hooks/useImageUpload';

import msg from '../assets/errorMessages';

const useStyles = makeStyles(() => ({
  input: {display: 'none'},
}));
const AddPicture = () => {
  const classes = useStyles();
  const [file, setFile] = useState([]);
  const inputRef = useRef(false);
  const {images, setImages} = useContext(ImageContext);
  const {dispatchMessage, ALERT_ACTION_TYPE} = useContext(AlertMessageContext);

  const errorCallback = (msg) => {
    dispatchMessage({type: ALERT_ACTION_TYPE.ERROR, payload: msg});
  };

  useImageUpload(images, file, inputRef, setImages, errorCallback);

  const imageUploadListener = async (evt) => {
    const selectedFiles = Array.from(evt.target.files);

    const numberOfCurrentUploadedImage = images.length;
    const allowToUpload = 10 - numberOfCurrentUploadedImage;
    const numberOfSelectedFile = selectedFiles.length;

    if (numberOfSelectedFile > allowToUpload) {
      const allowed = selectedFiles.filter((file, index) => {
        if (index < allowToUpload) {
          return file;
        }
      });
      setFile(allowed);
      dispatchMessage({
        type: ALERT_ACTION_TYPE.ERROR,
        payload: msg.fileMaximumUploadErrorMessage,
      });
      return;
    }
    setFile(selectedFiles);
  };

  return (
    <>
      <input
        accept='image/*'
        className={classes.input}
        id='icon-button-file'
        type='file'
        onChange={imageUploadListener}
        multiple
        ref={inputRef}
      />
      <label htmlFor='icon-button-file'>
        <IconButton aria-label='upload picture' component='span'>
          <PhotoCamera />
        </IconButton>
      </label>
    </>
  );
};

export default AddPicture;
