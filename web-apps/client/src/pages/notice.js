import React, { useContext, useEffect } from 'react';
import SlideUpSnackbar from '../components/snack-bar';
import { SnackbarContext } from '../contexts/snackbar';

export default () => {
  const CLOSEDURATION = 3000;
  const { notice, setNotice } = useContext(SnackbarContext);
  const closePopupLayer = () => {
    if (!notice.open) {
      return;
    }
    setTimeout(() => {
      setNotice();
    }, CLOSEDURATION);
  };
  useEffect(closePopupLayer, [notice, setNotice]);

  return (
    <SlideUpSnackbar bottom='3.5rem' open={notice.open} duration={300} message={notice.message} />
  );
};
