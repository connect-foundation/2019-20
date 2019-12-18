import React, { createContext } from 'react';
import socketIOClient from 'socket.io-client';

// types
import { childrenType } from '../types';

const HOST = 'http://10.180.171.184:5000';
const NAME_SPACE = '/chat';
const socket = socketIOClient(HOST + NAME_SPACE);

socket.on('connect', () => {
  console.log('connect!');
});

socket.on('connect_error', () => {
  console.log('connect_error');
});
socket.on('reconnect_error', (err) => {
  // reconnect_error에서는 connect를 무한으로 요청한다.
  // 실제로 웹 소켓 서버가 죽었을때 reconnect 횟수를 제한하거나,
  // 특정 페이지로 redirect 시키는 작업이 필요할까?
  console.log('Reconnect Error', err);
});

export const ChatSocketContext = createContext({
  chatSocket: socket,
});

export const ChatSocketProvider = ({ children }) => {
  return (
    <ChatSocketContext.Provider value={{ chatSocket: socket }}>
      {children}
    </ChatSocketContext.Provider>
  );
};

ChatSocketProvider.propTypes = {
  children: childrenType,
};

ChatSocketProvider.defaultProps = {
  children: [],
};
