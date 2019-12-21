import React, {useContext} from 'react';

// material ui
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

// components
import ChatBox from './ChatBox';

// utils
import {getISOCurrentDate} from '../utils';

// context
import {UserContext} from '../contexts/User';

// types
import {messageShape} from '../types';

// component
const MessageItem = ({message: {userId, content, timestamp}}) => {
  // @ts-ignore
  const {user} = useContext(UserContext);

  return (
    <ListItem>
      <Grid
        container
        direction='row'
        justify={user === userId ? 'flex-end' : 'flex-start'}
        alignItems='center'
      >
        <Grid item>
          <ChatBox
            content={content}
            timestamp={timestamp}
            isMyChat={user === userId}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};

MessageItem.propTypes = {
  message: messageShape,
};

MessageItem.defaultProps = {
  message: {
    timestamp: getISOCurrentDate(),
    content: '',
    userId: null,
  },
};

export default MessageItem;
