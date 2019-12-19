import React, {useState, createContext, useContext} from 'react';

import useCredentialFetch from '../hooks/useCredentialFetch';
import {loginStatusHandleURI} from '../assets/uris';
import {AlertMessageContext} from './AlertMessage';

export const UserContext = createContext();

const User = ({children}) => {
  const [user, setUser] = useState({id: ''});
  const {dispatchMessage, ACTION_TYPE} = useContext(AlertMessageContext);

  const jwtErrorMessage = '잘못된 유저 정보로 인해 로그아웃 됩니다.';
  const serverErrorMessage =
    '서버 장애가 있습니다. 잠시 후 다시 시도해 주세요.';

  const detectUserErrorHandler = (err) => {
    if (err) {
      if (err.message === 'Network Error') {
        dispatchMessage({type: ACTION_TYPE.ERROR, payload: serverErrorMessage});
      } else if (err.response.status === 400) {
        dispatchMessage({type: ACTION_TYPE.ERROR, payload: jwtErrorMessage});
      }
    }
  };

  useCredentialFetch(loginStatusHandleURI, setUser, detectUserErrorHandler);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export default User;
