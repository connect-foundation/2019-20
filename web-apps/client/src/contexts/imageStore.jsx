import React, {useState, createContext} from 'react';

export const ImageContext = createContext();

const ImageStore = ({children}) => {
  const [images, setImages] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <ImageContext.Provider value={{images, setImages, alertOpen, setAlertOpen}}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageStore;
