import React, {useContext, useRef} from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {makeStyles} from '@material-ui/core/styles';

import {ImageContext} from '../contexts/imageStore';
import getFormData from '../utils/resizeProcess';
import {uploadImages} from '../utils/apiCall';

const useStyles = makeStyles(() => ({
  input: {display: 'none'},
  camera: {color: 'white'},
}));
const AddPicture = () => {
  const classes = useStyles();
  const inputRef = useRef(false);
  const {setImages, setAlertMessage} = useContext(ImageContext);

  const ImageUploadErrorMessage =
    '이미지를 업로드하는데 실패했습니다. 다시 시도해주세요.';

  const resetFileInputs = (image) => {
    setImages(image);
    inputRef.current.value = '';
  };

  const uploadProcess = async (dataList) => {
    const imageCDN = [];

    for (let data of dataList) {
      try {
        const {form, name} = data;
        const result = await uploadImages(form);
        imageCDN.push({result, name});
      } catch (err) {
        throw new Error(ImageUploadErrorMessage);
      }
    }

    const loadImage = imageCDN.map((image) => ({
      mobile: image.result.data.mobile,
      deskTop: image.result.data.deskTop,
      name: image.name,
      loading: false,
    }));

    resetFileInputs(loadImage);
  };

  const imageUploadListener = async (evt) => {
    const files = Array.from(evt.target.files);
    const preResized = files.map((_) => ({loading: true}));
    setImages(preResized);

    const dataList = await getFormData(files);
    try {
      await uploadProcess(dataList);
    } catch (err) {
      setAlertMessage(err.message);
      resetFileInputs([]);
    }
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
          <PhotoCamera className={classes.camera} />
        </IconButton>
      </label>
    </>
  );
};

export default AddPicture;
