import React, {useState, useEffect, createContext} from 'react';

export const ProductContext = createContext('');

const ProductStore = ({children}) => {
  const [images, setImages] = useState([]);

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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductStore;
