import React, {useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';

import WriteHeader from '../components/WriteHeader';
import ProductForm from '../components/ProductForm';

import {UserContext} from '../contexts/User';
import {AlertMessageContext} from '../contexts/AlertMessage';

import useFetch from '../hooks/useFetch';

import {makeStyles} from '@material-ui/core/styles';

import initCSS from '../assets/cssText';

const useStyles = makeStyles(() => ({
  productForm: {
    position: 'relative',
    minHeight: '100%',
  },
}));

const EditProduct = () => {
  let history = useHistory();
  const classes = useStyles();
  const {user} = useContext(UserContext);
  const {dispatchMessage, ALERT_ACTION_TYPE} = useContext(AlertMessageContext);
  const notLogInErrorMessage = '수정 권한이 없습니다.';
  // const [product, setProduct] = useState(null)

  useEffect(() => {
    dispatchMessage({
      type: ALERT_ACTION_TYPE.ERROR,
      payload: '서비스 준비중입니다.',
    });
    history.goBack();
  }, []);

  const isLogInned = (user) => {
    return user !== null;
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
  // if (!result) {
  //   dispatchMessage({
  //     type: ACTION_TYPE.ERROR,
  //     payload: notLogInErrorMessage,
  //   });
  //   return <Redirect to='/' />;
  // }
  return (
    <>
      <WriteHeader />
      <ProductForm className={classes.productForm} />
    </>
  );
};

export default EditProduct;
