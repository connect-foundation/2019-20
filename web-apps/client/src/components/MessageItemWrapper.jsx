import React, {useContext} from 'react';

// material ui
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

// components
import MessageItem from './MessageItem';

// utils
import {getISOCurrentDate} from '../utils';

// context
import {UserContext} from '../contexts/User';

// types
import {messageShape} from '../types';

// component
const MessageItemWrapper = ({message: {userId, content, timestamp}}) => {
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
          <MessageItem
            content={content}
            timestamp={timestamp}
            isMyChat={user === userId}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};

MessageItemWrapper.propTypes = {
  message: messageShape,
};

MessageItemWrapper.defaultProps = {
  message: {
    timestamp: getISOCurrentDate(),
    content: '',
    userId: null,
  },
};

export default MessageItemWrapper;
