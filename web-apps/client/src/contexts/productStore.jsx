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

  useCredentialFetch(loginStatusHandleURI, setUser, (err) => {
    if (err) {
      if (err.message === 'Network Error') {
        setAlertMessage(serverErrorMessage);
      } else {
        setAlertMessage(jwtErrorMessage);
      }
    }
  });

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
    <ProductContext.Provider
      value={{
        images,
        setImages,
        alertMessage,
        setAlertMessage,
        fileDelimiter,
        mobileDesktopDelimiter,
        user,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductStore;
