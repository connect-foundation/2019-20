import {
  dataURItoFile,
  getResizedImageInDataURI,
  makeImageObjectByURI,
  readFileAsURI,
} from './imageProcess';

const getFormData = async (pictures) => {
  const dataList = [];

  for (let picture of pictures) {
    const form = new FormData();
    const resizedImages = await makeProperSizeOfPicture(picture);
    for (let img of resizedImages) {
      form.append('MyImg', img);
    }
    dataList.push({form, name: picture.name});
  }

  return dataList;
};
const readPicture = async (picture) => {
  const {dataURI, type, name} = await readFileAsURI(picture);
  return {uri: dataURI, type, name};
};
const makeProperSizeOfPicture = async (picture) => {
  const properSizeForDesktop = 5 * 1024 * 1024;
  const properSizeForMobile = 2 * 1024 * 1024;
  const size = picture.size;

  if (size < properSizeForMobile) {
    return [picture];
  }

  const {uri, type, name} = await readPicture(picture);
  const originImg = await makeImageObjectByURI(uri, type);

  if (size < properSizeForDesktop) {
    const mobileImg = resizeImage(
      originImg,
      name,
      size,
      type,
      properSizeForMobile,
    );
    return [mobileImg, picture];
  } else if (size > properSizeForDesktop) {
    const mobileImg = resizeImage(
      originImg,
      name,
      size,
      type,
      properSizeForMobile,
    );
    const desktopImg = resizeImage(
      originImg,
      name,
      size,
      type,
      properSizeForDesktop,
    );
    return [mobileImg, desktopImg];
  }
};
const resizeImage = (originImg, name, size, type, properSizeForMobile) => {
  const rate = properSizeForMobile / size;
  const resizedImage = getResizedImageInDataURI(originImg, rate, type);
  const result = dataURItoFile(resizedImage, name);
  return result;
};

export default getFormData;
