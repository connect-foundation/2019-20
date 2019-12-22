import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useReducer,
} from 'react';

import useCredentialFetch from '../hooks/useCredentialFetch';
import {AUTH} from '../assets/uris';
import {AlertMessageContext} from './AlertMessage';

const USER_ACTION_TYPE = {
  LOG_IN: 'log in success',
  NOT_LOG_IN: 'not logged in',
};

const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTION_TYPE.LOG_IN: {
      return {...action.payload, fetched: true};
    }
    case USER_ACTION_TYPE.NOT_LOG_IN: {
      return {fetched: true};
    }
    default: {
      throw new Error(`unexpected action.type: ${action.type}`);
    }
  }
};

export const UserContext = createContext({});
const User = ({children}) => {
  const [user, dispatchUser] = useReducer(userReducer, {fetched: false});
  const {dispatchMessage, ALERT_ACTION_TYPE} = useContext(AlertMessageContext);
  const jwtErrorMessage = '잘못된 유저 정보로 인해 로그아웃 됩니다.';
  const serverErrorMessage =
    '서버 장애가 있습니다. 잠시 후 다시 시도해 주세요.';

  const detectUserErrorHandler = useCallback(
    (err) => {
      if (err) {
        if (err.message === 'Network Error') {
          dispatchMessage({
            type: ALERT_ACTION_TYPE.ERROR,
            payload: serverErrorMessage,
          });
        } else if (err.response.status === 400) {
          dispatchMessage({
            type: ALERT_ACTION_TYPE.ERROR,
            payload: jwtErrorMessage,
          });
        }
      }
    },
    [ALERT_ACTION_TYPE.ERROR, dispatchMessage],
  );

  const setLoginResult = useCallback((data) => {
    if (data) {
      dispatchUser({type: USER_ACTION_TYPE.LOG_IN, payload: data});
    } else {
      dispatchUser({type: USER_ACTION_TYPE.NOT_LOG_IN});
    }
  }, []);

  useCredentialFetch(
    AUTH.LOGIN_STATUS_HANDLE,
    setLoginResult,
    detectUserErrorHandler,
  );
  return (
    <UserContext.Provider value={{user, dispatchUser, USER_ACTION_TYPE}}>
      {children}
    </UserContext.Provider>
  );
};
export default User;
