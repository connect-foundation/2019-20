import React, {useEffect, useContext} from 'react';

import {Redirect} from 'react-router-dom';

import WriteHeader from '../components/WriteHeader';
import ProductForm from '../components/ProductForm';

import {UserContext} from '../contexts/User';
import {AlertMessageContext} from '../contexts/AlertMessage';

import {makeStyles} from '@material-ui/core/styles';

import initCSS from '../assets/cssText';

const useStyles = makeStyles(() => ({
  productForm: {
    position: 'relative',
    minHeight: '100%',
  },
}));

const WriteProduct = () => {
  const classes = useStyles();
  const {user} = useContext(UserContext);
  const {dispatchMessage} = useContext(AlertMessageContext);
  const notLogInErrorMessage = '로그인 먼저 하셔야 합니다.';

  const isLogInned = (user) => {
    if (user === null) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const css = document.createElement('style');

    css.innerText = initCSS.writeProduct;
    const id = document.head.appendChild(css);

    return () => {
      document.head.removeChild(id);
    };
  }, []);

  const result = isLogInned(user);
  if (!result) {
    dispatchMessage({
      type: 'error_message',
      payload: notLogInErrorMessage,
    });
    return <Redirect to='/' />;
  }

  return (
    <>
      <WriteHeader />
      <ProductForm className={classes.productForm} />
    </>
  );
};

export default WriteProduct;
