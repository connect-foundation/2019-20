import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const SnackbarContext = createContext('');

const noticeClose = { open: false, message: '' };
const reducer = (notice, message) => {
  if (!message) {
    return noticeClose;
  }
  return { open: true, message };
};

export const SnackbarProvider = ({ children }) => {
  const [notice, setNotice] = useReducer(reducer, noticeClose);

  return (
    <>
      <SnackbarContext.Provider value={{ notice, setNotice }}>
        {children}
      </SnackbarContext.Provider>
    </>
  );
};

// https://stackoverflow.com/questions/42122522/reactjs-what-should-the-proptypes-be-for-this-props-children
SnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

