import React, {useState, createContext} from 'react';

export const AlertMessageContext = createContext();

const AlertMessage = ({children}) => {
  const [alertMessage, setAlertMessage] = useState('');

  return (
    <AlertMessageContext.Provider
      value={{
        alertMessage,
        setAlertMessage,
      }}
    >
      {children}
    </AlertMessageContext.Provider>
  );
};

export default AlertMessage;
