import React, { useContext, useEffect } from 'react';
import SlideUpSnackbar from '../components/SnackBar';
import { SnackbarContext } from '../contexts/SnackBar';

export default () => {
  const { notice, setNotice } = useContext(SnackbarContext);

  useEffect(() => {
    let timerId;
    if (notice.open) {
      timerId = setTimeout(() => {
        setNotice('');
      }, 3000);
    }
    return () => {
      clearTimeout(timerId);
    }
  }, [notice, setNotice]);

  return (
    <SlideUpSnackbar bottom='3.5rem' open={notice.open} message={notice.message} />
  );
};
