import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import socketIOClient from 'socket.io-client';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    position: 'fixed',
    bottom: '0',
    right: '0',
    zIndex: 100,
    backgroundColor: 'lightgreen',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: 'white',
  },
}));

const ChatInputField = ({onMessageSubmit, chatInputRef}) => {
  const classes = useStyles();
  const send = () => {
    const socket = socketIOClient('localhost:5000');
    socket.emit('this is', 'test');
  };

  return (
    <Paper component='form' className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder='메세지를 입력하세요.'
        inputProps={{'aria-label': 'search google maps'}}
        inputRef={chatInputRef}
      />
      <IconButton
        type='submit'
        className={classes.iconButton}
        onClick={onMessageSubmit}
        aria-label='search'
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default ChatInputField;
