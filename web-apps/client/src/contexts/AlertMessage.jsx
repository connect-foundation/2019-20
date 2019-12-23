import React, {useReducer, createContext} from 'react';

export const AlertMessageContext = createContext({});

const ALERT_ACTION_TYPE = {
  CLEAR: 'clear',
  ERROR: 'error_message',
};

const alertMessageReducer = (state, action) => {
  switch (action.type) {
    case ALERT_ACTION_TYPE.CLEAR: {
      return state.slice(1);
    }
    case ALERT_ACTION_TYPE.ERROR: {
      return [...state, action.payload];
    }
    default: {
      throw new Error(`unexpected action.type: ${action.type}`);
    }
  }
};

const AlertMessage = ({children}) => {
  const [message, dispatchMessage] = useReducer(alertMessageReducer, []);

  return (
    <AlertMessageContext.Provider
      value={{message, dispatchMessage, ALERT_ACTION_TYPE}}
    >
      {children}
    </AlertMessageContext.Provider>
  );
};

export default AlertMessage;
