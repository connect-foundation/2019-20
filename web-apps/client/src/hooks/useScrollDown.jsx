import { useEffect } from 'react';

import { isScrollBottom } from '../utils';

export default (event) => {
  useEffect(() => {
    const scrollDownEvent = () => {
      if (isScrollBottom()) {
        event();
      }
    };
    const whellScrollDownEvent = (e) => {
      if (e.deltaY > 0) {
        scrollDownEvent();
      }
    }
    window.addEventListener('wheel', whellScrollDownEvent);
    window.addEventListener('scroll', scrollDownEvent);
    return () => {
      window.removeEventListener('wheel', whellScrollDownEvent);
      window.removeEventListener('scroll', scrollDownEvent);
    };
  }, [event]);
};