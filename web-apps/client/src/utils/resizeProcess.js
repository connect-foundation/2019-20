import {
  dataURItoFile,
  getResizedImageInDataURI,
  makeImageObjectByURI,
  readFileAsURI,
} from './imageProcess';

const readPicture = async (picture) => {
  const {dataURI, type, name} = await readFileAsURI(picture);
  return {uri: dataURI, type, name};
};
const resizeImage = (originImg, name, size, type, properSizeForMobile) => {
  const rate = properSizeForMobile / size;
  const resizedImage = getResizedImageInDataURI(originImg, rate, type);
  const result = dataURItoFile(resizedImage, name);
  return result;
};
const makeProperSizeOfPicture = async (picture) => {
  const properSizeForDesktop = 5 * 1024 * 1024;
  const properSizeForMobile = 2 * 1024 * 1024;
  const {size} = picture;

  if (size < properSizeForMobile) {
    return [picture];
  }

  const {uri, type, name} = await readPicture(picture);
  const originImg = await makeImageObjectByURI(uri);

  if (size < properSizeForDesktop) {
    const mobileImg = resizeImage(
      originImg,
      name,
      size,
      type,
      properSizeForMobile,
    );
    return [mobileImg, picture];
  }
  if (size > properSizeForDesktop) {
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
  return undefined;
};

const getFormData = async (pictures) => {
  const formData = pictures.map(async (picture) => {
    const form = new FormData();

    const resizedImages = await makeProperSizeOfPicture(picture);
    resizedImages.forEach((img) => {
      form.append('MyImg', img);
    });
    return {form, name: picture.name};
  });

  const result = await Promise.all(formData);

  const dataList = result.reduce((acc, cur) => {
    return acc.concat(cur);
  }, []);

  return dataList;
};

export default getFormData;
