import React, {useEffect} from 'react';

import getFormData from '../utils/resizeProcess';
import {uploadImages} from '../utils/apiCall';

const UseImageUpload = (context, files, input, setContext, errorCallback) => {
  const ImageUploadErrorMessage =
    '이미지를 업로드하는데 실패했습니다. 다시 시도해주세요.';

  const setAllFileOnLoading = (files, setContext) => {
    const preResized = files.map((_) => ({loading: true}));
    setContext(context.concat(preResized));
  };

  const buildFormAndUploadToCloud = async (
    context,
    files,
    input,
    setContext,
    errorCallback,
  ) => {
    const formDataList = await getFormData(files);
    try {
      await uploadProcess(context, formDataList, input, setContext);
    } catch (err) {
      errorCallback(err.message);
      resetFileInputs([], input, setContext);
    }
  };

  const getAlreadyUploadedImages = (context) => {
    const images = context.map((image, index) => {
      const {mobile, deskTop} = image;
      const data = {mobile, deskTop};
      return {data, name: index};
    });
    return images;
  };

  const uploadProcess = async (context, formDataList, input, setContext) => {
    const imageCDN = getAlreadyUploadedImages(context);

    for (let formData of formDataList) {
      try {
        const {form, name} = formData;
        const {data} = await uploadImages(form);
        imageCDN.push({data, name});
      } catch (err) {
        throw new Error(ImageUploadErrorMessage);
      }
    }

    const loadImage = imageCDN.map((image) => ({
      mobile: image.data.mobile,
      deskTop: image.data.deskTop,
      name: image.name,
      loading: false,
    }));

    resetFileInputs(loadImage, input, setContext);
  };

  const resetFileInputs = (image, input, setContext) => {
    input.current.value = '';
    setContext(image);
  };

  useEffect(() => {
    if (!files.length) {
      return;
    }
    setAllFileOnLoading(files, setContext);
    buildFormAndUploadToCloud(context, files, input, setContext, errorCallback);
  }, [files]);
};

export default UseImageUpload;
