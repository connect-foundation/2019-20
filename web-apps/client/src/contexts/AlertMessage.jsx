import React, { useReducer, createContext } from 'react';

export const AlertMessageContext = createContext({});

const alertMessageReducer = (state, action) => {
  switch (action.type) {
    case 'clear': {
      return state.slice(1);
    }
    case 'error_message': {
      return [...state, action.payload];
    }
    default: {
      throw new Error(`unexpected action.type: ${action.type}`);
    }
  }
};

const AlertMessage = ({ children }) => {
  const [message, dispatchMessage] = useReducer(alertMessageReducer, []);

  return (
    <AlertMessageContext.Provider value={{ message, dispatchMessage }}>
      {children}
    </AlertMessageContext.Provider>
  );
};

export default AlertMessage;
