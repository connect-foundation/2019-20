import React from 'react';
import {func} from 'prop-types';

// material ui
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

// types
import {refType} from '../types';

// material ui style
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

// component
const ChatInputField = ({onMessageSubmit, chatInputRef}) => {
  const classes = useStyles({});

  return (
    <Paper component='form' className={classes.root} onSubmit={onMessageSubmit}>
      <InputBase
        className={classes.input}
        placeholder='메세지를 입력하세요.'
        inputProps={{'aria-label': 'search google maps'}}
        inputRef={chatInputRef}
      />
      <IconButton
        type='submit'
        className={classes.iconButton}
        aria-label='search'
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

ChatInputField.propTypes = {
  onMessageSubmit: func,
  chatInputRef: refType,
};

ChatInputField.defaultProps = {
  onMessageSubmit: () => {},
  chatInputRef: null,
};

export default ChatInputField;
