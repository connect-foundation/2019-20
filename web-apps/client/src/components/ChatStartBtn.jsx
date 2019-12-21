import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  chatButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  chatButton: {
    background: '#1db000',
    color: 'white',
    fontSize: '0.8rem',
  },
}));
const ChatStartBtn = () => {
  const classes = useStyles();
  return (
    <div className={classes.chatButtonWrapper}>
      <Button variant='contained' className={classes.chatButton}>
        채팅으로 거래하기
      </Button>
    </div>
  );
};

export default ChatStartBtn;
