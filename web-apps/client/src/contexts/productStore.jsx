import React, {useState, useEffect, createContext} from 'react';

import useCredentialFetch from '../hooks/useCredentialFetch';

import {loginStatusHandleURI} from '../assets/uris';

export const ProductContext = createContext();

const ProductStore = ({children}) => {
  const [images, setImages] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [user, setUser] = useState(null);

  const jwtErrorMessage = '잘못된 유저 정보로 인해 로그아웃 됩니다.';
  const serverErrorMessage =
    '서버 장애가 있습니다. 잠시 후 다시 시도해 주세요.';
  const fileDelimiter = ' ';
  const mobileDesktopDelimiter = '$$';

  const detectUserErrorHandler = (err) => {
    if (err) {
      if (err.message === 'Network Error') {
        setAlertMessage(serverErrorMessage);
      } else {
        setAlertMessage(jwtErrorMessage);
      }
    }
  };

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

  useCredentialFetch(loginStatusHandleURI, setUser, detectUserErrorHandler);

  useEffect(() => {
    const storage = window.localStorage.getItem('images');
    window.localStorage.setItem('images', '');
    if (storage === null) {
      return;
    }
    const preSeparated = storage.split(fileDelimiter).slice(0, -1);
    const imageInStorage = preSeparated.map((image, index) => {
      const [mobile, deskTop] = image.split(mobileDesktopDelimiter);
      return {mobile, deskTop, name: index, loading: false};
    });
    setImages(imageInStorage);
  }, []);

  useEffect(() => {
    if (images.length) {
      if (isOnLoading(images) === false) {
        const imageListToString = listToString(images);

        window.localStorage.setItem('images', imageListToString);
      } else if (!isOnLoading(images)) {
        throw new Error('image loading is not boolean type.');
      }
    } else if (images.length === 0) {
      window.localStorage.setItem('images', '');
    } else {
      throw new Error('images context is not array!!!');
    }
  }, [images]);

  return (
    <ProductContext.Provider
      value={{
        images,
        setImages,
        alertMessage,
        setAlertMessage,
        user,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductStore;
