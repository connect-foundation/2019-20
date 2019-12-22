import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import {UserContext} from '../contexts/User';

import {CHAT, ROUTES} from '../assets/uris';

import {isLoggedIn} from '../utils/auth';
// types
import {userShape, productShape} from '../types';

const useStyles = makeStyles(() => ({
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

const ChatStartBtn = ({seller, product}) => {
  const classes = useStyles({});
  const history = useHistory();
  // @ts-ignore
  const {user} = useContext(UserContext);

  const getRoomId = async (data) => {
    try {
      const {
        data: {_id},
      } = await axios({
        method: 'post',
        url: CHAT.INIT_PATH,
        withCredentials: true,
        data,
      });

      return _id;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  };

  const startChat = async (e) => {
    e.preventDefault();
    const fetchedRoomId = await getRoomId({
      buyer: {
        ...user,
        _id: user.id,
      },
      seller,
      product,
    });

    if (fetchedRoomId) {
      history.push(ROUTES.getChatRoomPath(fetchedRoomId));
    }
  };

  const buttonMessage = () =>
    isLoggedIn(user) ? '채팅으로 거래하기' : '로그인 해주세요';

  return (
    <div className={classes.chatButtonWrapper}>
      <Button
        type='button'
        onClick={startChat}
        variant='contained'
        className={classes.chatButton}
        disabled={!isLoggedIn(user)}
      >
        {buttonMessage()}
      </Button>
    </div>
  );
};

ChatStartBtn.propTypes = {
  seller: userShape.isRequired,
  product: productShape.isRequired,
};

export default ChatStartBtn;
