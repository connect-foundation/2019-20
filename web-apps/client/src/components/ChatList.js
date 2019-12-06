import React from 'react';
import {arrayOf} from 'prop-types';

// material ui
import {makeStyles} from '@material-ui/core/styles';

// components
import ChatRow from './ChatRow';

// types
import {uIdType, messageShape} from '../types';

// utils
import {getISOCurrentDate} from '../utils';

// material ui style
const useStyles = makeStyles(() => ({
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

// component
export default function ChatList({messages, currentUser}) {
  const classes = useStyles({});

  return (
    <ul className={classes.ul}>
      {messages.map((message) => (
        <ChatRow
          key={`item-${message.timestamp}`}
          message={message}
          currentUser={currentUser}
        />
      ))}
    </ul>
  );
}

ChatList.propTypes = {
  messages: arrayOf(messageShape),
  currentUser: uIdType,
};

ChatList.defaultProps = {
  messages: [
    {
      timestamp: getISOCurrentDate(),
      content: '',
      userId: null,
    },
  ],
  currentUser: null,
};
