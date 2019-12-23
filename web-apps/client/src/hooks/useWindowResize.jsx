import { useEffect } from 'react';

export default (event) => {
  useEffect(() => {
    event();
    window.addEventListener('resize', event);
    return () => {
      window.removeEventListener('resize', event);
    };
  }, [event]);
}
