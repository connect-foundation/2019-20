import React, {useState, useContext, useRef} from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {makeStyles} from '@material-ui/core/styles';

import {ImageContext} from '../contexts/ImageStore';
import {AlertMessageContext} from '../contexts/alertMessage';

import useImageUpload from '../hooks/useImageUpload';

const useStyles = makeStyles(() => ({
  input: {display: 'none'},
}));
const AddPicture = () => {
  const classes = useStyles();
  const fileMaximumUploadErrorMessage = '사진은 10장까지만 입력 가능합니다.';
  const [file, setFile] = useState([]);
  const inputRef = useRef(false);
  const {images, setImages} = useContext(ImageContext);
  const {setAlertMessage} = useContext(AlertMessageContext);

  useImageUpload(images, file, inputRef, setImages, setAlertMessage);

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
      setAlertMessage(fileMaximumUploadErrorMessage);
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
