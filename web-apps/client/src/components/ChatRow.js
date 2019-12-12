import React from 'react';

// material ui
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

// components
import ChatBox from './ChatBox';

// utils
import {getISOCurrentDate} from '../utils';

// types
import {uIdType, messageShape} from '../types';

// component
const ChatRow = ({message: {userId, content, timestamp}, currentUser}) => (
  <ListItem>
    <Grid
      container
      direction='row'
      justify={currentUser === userId ? 'flex-end' : 'flex-start'}
      alignItems='center'
    >
      <Grid item>
        <ChatBox
          content={content}
          timestamp={timestamp}
          isMyChat={currentUser === userId}
        />
      </Grid>
    </Grid>
  </ListItem>
);

ChatRow.propTypes = {
  message: messageShape,
  currentUser: uIdType,
};

ChatRow.defaultProps = {
  message: {
    timestamp: getISOCurrentDate(),
    content: '',
    userId: null,
  },
  currentUser: null,
};

export default ChatRow;
