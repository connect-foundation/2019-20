import React, {useContext} from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import {
  dataURItoFile,
  getResizedImageInDataURI,
  makeImageByURI,
  readFileAsURI,
} from '../utils/imageProcess';
import {ImageContext} from '../pages/newProduct';

const useStyles = makeStyles(() => ({
  input: {
    display: 'none',
  },
  camera: {
    color: 'white',
  },
}));

const AddPicture = () => {
  const classes = useStyles();

  const {setImages} = useContext(ImageContext);

  const uploadImages = async (forms, imageList) => {
    const uploadedImageList = forms.map(async (frm) => {
      const response = await axios.post(
        `http://localhost:5000/products/picture/`,
        frm,
      );
      const result = await response;

      return result.data;
    });

    const result = await Promise.all(uploadedImageList);

    setImages(imageList);

    return result;
  };

  const doResizeImages = async (files) => {
    const resizedImages = [];
    const imageList = [];
    const maxWidth = 600;
    const maxHeight = 600;

    for (let file of files) {
      const {dataURI, type, name} = await readFileAsURI(file);
      imageList.push({
        uri: dataURI,
        name,
        loading: true,
      });

      const form = new FormData();
      form.append('MyImg', file);

      if (file.size > 2 * 1024 * 1024) {
        const originalImage = await makeImageByURI(dataURI, type);
        const resizedImage = getResizedImageInDataURI(
          originalImage,
          maxWidth,
          maxHeight,
        );
        const resizedImageFile = dataURItoFile(resizedImage, name);
        form.append('MyImg', resizedImageFile);
      }
      resizedImages.push(form);
    }

    return {resizedImages, imageList};
  };
  const multipleImagesResizeAndUpload = async (files) => {
    const {resizedImages, imageList} = await doResizeImages(files);
    const imgaesCDN = await uploadImages(resizedImages, imageList);
    return imgaesCDN;
  };

  const imageUploadListener = async (evt) => {
    const files = Array.from(evt.target.files);
    const preResized = files.map((file) => ({name: file.name}));
    setImages(preResized);
    const urls = await multipleImagesResizeAndUpload(files);
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
