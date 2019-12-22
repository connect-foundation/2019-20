import React from 'react';
import {arrayOf} from 'prop-types';

// material ui
import {makeStyles} from '@material-ui/core/styles';

// components
import MessageItemWrapper from './MessageItemWrapper';

// types
import {messageShape} from '../types';

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
export default function ChatList({messages}) {
  const classes = useStyles({});

  return (
    <ul className={classes.ul}>
      {messages.map((message) => (
        <MessageItemWrapper
          key={`item-${message.timestamp}`}
          message={message}
        />
      ))}
    </ul>
  );
}

ChatList.propTypes = {
  messages: arrayOf(messageShape),
};

ChatList.defaultProps = {
  messages: [
    {
      timestamp: getISOCurrentDate(),
      content: '',
      userId: null,
    },
  ],
};
