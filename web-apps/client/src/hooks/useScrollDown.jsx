import { useEffect } from 'react';

import { isScrollBottom } from '../utils';

export default (event) => {
  useEffect(() => {
    const scrollDownEvent = () => {
      if (isScrollBottom()) {
        event();
      }
    };
    window.addEventListener('scroll', scrollDownEvent);
    return () => {
      window.removeEventListener('scroll', scrollDownEvent);
    };
  }, [event]);
};