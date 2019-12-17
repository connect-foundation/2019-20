import React, { useContext, useEffect } from 'react';
import SlideUpSnackbar from '../components/snack-bar';
import { SnackbarContext } from '../contexts/snackbar';

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
