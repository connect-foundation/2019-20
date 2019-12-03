import React, {useState, useEffect, createContext} from 'react';

export const ImageContext = createContext();

const ImageStore = ({children}) => {
  const [images, setImages] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    if (images.length) {
      if (images[0].loading) {
        window.localStorage.setItem('images', 'loading');
      } else if (!images[0].loading) {
        const imageListToString = images.reduce((acc, cur) => {
          return acc + cur.uri + ' ';
        }, '');

        window.localStorage.setItem('images', imageListToString);
      } else {
        throw new Error('Error in image Store.');
      }
    } else if (images.length === 0) {
      const storageData = window.localStorage.getItem('images');
      if (storageData === null || storageData.length === 0) {
        window.localStorage.setItem('images', '');
      }
    } else {
      throw new Error('Error in image Store.');
    }
  }, [images]);

  return (
    <ImageContext.Provider
      value={{
        images,
        setImages,
        alertOpen,
        setAlertOpen,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export default ImageStore;
