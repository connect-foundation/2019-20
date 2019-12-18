import React, {useState, useEffect} from 'react';

const UseWindowSize = () => {
  const isClient = typeof window === 'object';
  const getSize = () => {
    return isClient ? window.innerWidth : undefined;
  };

  const initWidth = getSize();
  const [width, setWidth] = useState(initWidth);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    const resizeHandler = () => {
      const width = getSize();
      setWidth(width);
    };

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [width]);
  //ref:https://usehooks.com/useWindowSize/

  return width;
};

export default UseWindowSize;
