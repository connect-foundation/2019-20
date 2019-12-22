import React, {useEffect, useCallback, useState, useContext} from 'react';
import axios from 'axios';

// material ui
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

import {FixedSizeList} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// components
import ActionBar from '../components/ActionBar';
import ChatListItem from '../components/ChatListItem';
import GithubLogInButton from '../components/GithubLogInButton';

import {isLoggedIn} from '../utils/auth';
import {UserContext} from '../contexts/User';
import {CHAT} from '../assets/uris';

const useStyles = makeStyles(() => ({
  root: {
    width: '100vw',
    height: '100vh',
  },
}));

export default function ChatList() {
  const classes = useStyles({});
  // @ts-ignore
  const {user} = useContext(UserContext);

  const [chatList, setChatList] = useState([]);

  const fetchChatList = useCallback(async () => {
    console.log(CHAT.getChatListQuery(user.id));
    const {data} = await axios.get(CHAT.getChatListQuery(user.id));
    console.log(data);
    setChatList(data);
  }, [user.id]);

  useEffect(() => {
    if (user.id) fetchChatList();
  }, [fetchChatList, user.id]);

  console.log('로그인 햇니?', user, isLoggedIn(user));

  return (
    <>
      <ActionBar title='대화 목록' />
      <Container maxWidth='md' className={classes.root}>
        {isLoggedIn(user) ? (
          <AutoSizer>
            {({height, width}) => (
              <FixedSizeList
                height={height}
                width={width}
                itemSize={150}
                itemCount={chatList.length}
                itemData={chatList}
              >
                {ChatListItem}
              </FixedSizeList>
            )}
          </AutoSizer>
        ) : (
          <div
            style={{
              margin: '0',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Typography gutterBottom variant='subtitle1'>
              로그인 해 주세요~
            </Typography>
            <GithubLogInButton />
          </div>
        )}
      </Container>
    </>
  );
}
