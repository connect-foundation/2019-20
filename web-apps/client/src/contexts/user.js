import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '김철수',
    name: '가나다',
    email: 'jae3132@naver.com',
    authority: '황제',
    latitude: 37.499101,
    longitude: 127.028177,
    reputation: 37,
    numberOfRater: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};