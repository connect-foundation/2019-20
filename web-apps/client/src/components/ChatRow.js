import React from 'react';
import Grid from '@material-ui/core/Grid';
import ChatBox from './ChatBox';

const currentUser = 1;

export default function ChatRow({message: {id, timestamp, message}}) {
  const isMyChat = currentUser === id;
  return (
    <Grid
      container
      direction='row'
      justify={isMyChat ? 'flex-end' : 'flex-start'}
      alignItems='center'
    >
      <Grid item>
        <ChatBox message={message} timestamp={timestamp} isMyChat={isMyChat} />
      </Grid>
    </Grid>
  );
}
