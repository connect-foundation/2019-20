import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { UserContext } from '../contexts/User';
import { ImageContext } from '../contexts/Image';
import { deletePicture, deleteJWTRequest } from '../utils/apiCall';

const LogOutButton = ({ width }) => {
  const { user, setUser } = useContext(UserContext);
  const { images } = useContext(ImageContext);

  const deleteAllImages = () => {
    images.forEach((image) => {
      const { mobile, deskTop } = image;
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
  const logoutProcess = async () => {
    try{
      deleteAllImages();
    } catch(e) {
      console.log(e);
    } finally {
      cleanLocalStorage();
      deleteJWT();  
      logout();
    }
  };
  return (
    <div
      style={{ width, display: 'flex', alignItems: 'center' }}
      onClick={logoutProcess}
    >
      <LogoutIcon />  로그아웃
    </div>
  );
};

export default LogOutButton;
