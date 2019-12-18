import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import {UserContext} from '../contexts/User';
import {ImageContext} from '../contexts/Image';
import {deletePicture, deleteJWTRequest} from '../utils/apiCall';

const LogOutButton = ({width}) => {
  const {user, setUser} = useContext(UserContext);
  const {images} = useContext(ImageContext);

  const deleteAllImages = () => {
    images.forEach((image) => {
      const {mobile, deskTop} = image;
      const mobileKey = mobile.split('/').slice(-1)[0];
      const deskTopKey = deskTop.split('/').slice(-1)[0];
      deletePicture(mobileKey, deskTopKey);
    });
  };
  const cleanLocalStorage = () => {
    window.localStorage.clear();
  };
  const deleteJWT = () => {
    deleteJWTRequest();
  };
  const logout = () => {
    setUser(null);
  };
  console.log(user);
  const logoutProcess = async () => {
    deleteAllImages();
    cleanLocalStorage();
    deleteJWT();
    logout();
  };
  return (
    <Button
      variant='contained'
      color='secondary'
      style={{width}}
      onClick={logoutProcess}
    >
      로그아웃
    </Button>
  );
};

export default LogOutButton;
