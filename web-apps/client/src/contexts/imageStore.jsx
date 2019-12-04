import React, {useState, useEffect, createContext} from 'react';

export const ImageContext = createContext();

const ImageStore = ({children}) => {
  const [images, setImages] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const fileDelimiter = ' ';
  const mobileDesktopDelimiter = '$$';

  const listToString = (list) => {
    return list.reduce((acc, cur) => {
      return (
        acc + cur.mobile + mobileDesktopDelimiter + cur.deskTop + fileDelimiter
      );
    }, '');
  };

  const isOnLoading = (images) => {
    return images[0].loading;
  };

  useEffect(() => {
    if (images.length) {
      if (isOnLoading(images)) {
        window.localStorage.setItem('images', 'loading');
      } else if (isOnLoading(images) === false) {
        const imageListToString = listToString(images);

        window.localStorage.setItem('images', imageListToString);
      } else {
        throw new Error('image loading is not boolean type.');
      }
    } else if (images.length === 0) {
      const storageData = window.localStorage.getItem('images');
      if (storageData === null || storageData.length === 0) {
        window.localStorage.setItem('images', '');
      }
    } else {
      throw new Error('images context is not array!!!');
    }
  }, [images]);

  return (
    <ImageContext.Provider
      value={{
        images,
        setImages,
        alertMessage,
        setAlertMessage,
        fileDelimiter,
        mobileDesktopDelimiter,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export default ImageStore;
