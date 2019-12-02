import React, {useState, createContext} from 'react';

export const ImageContext = createContext();

const ImageStore = ({children}) => {
  const [images, setImages] = useState([]);
  return (
    <ImageContext.Provider value={{images, setImages}}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageStore;
