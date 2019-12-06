import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react';

// material ui
import List from '@material-ui/core/List';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

// components
import ChatInputField from '../components/ChatInputField';
import ChatSection from '../components/ChatSection';

// hooks
// import useIntersect from '../hooks/useIntersect';

// context
import {ChatSocketContext} from '../contexts/socket';

// utils
import {isInSameDay, isEmptyArr, setBaseDate, formatChat} from '../utils';

// fake datas
// import getConversations from '../dummy/chat';

// material ui style
const useStyles = makeStyles((theme) => ({
  bottomFix: {
    position: 'absolute',
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',

    paddingBottom: '10rem',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  liHeader: {
    textAlign: 'center',
  },
  goToBottomBTN: {
    position: 'fixed',
    bottom: '3rem',
    right: '1rem',
  },
}));
const currentUser = 1;
export default function Chat() {
  const classes = useStyles({});
  const {chatSocket} = useContext(ChatSocketContext);

  // const [formattedChat, setFormattedChat] = useState([]);
  // const [prevHeight, setPreveHeight] = useState(0);
  const [newChat, setNewChat] = useState([]);
  const chatInputRef = useRef(null);
  const bottomEl = useRef(null);
  const outerBoxRef = useRef(null);

  const goToBottom = () => {
    if (bottomEl.current) {
      window.scrollTo({
        behavior: 'smooth',
        top: bottomEl.current.offsetTop,
      });
    }
  };

  const insertMessages = useCallback((messages) => {
    setNewChat(formatChat(messages));
  }, []);

  useEffect(() => {
    chatSocket.once('prevMessages', insertMessages);
    return () => chatSocket.off('prevMessages');
  }, [insertMessages, chatSocket]);

  const insertNewMessage = useCallback(
    (msgObject) => {
      let messages = null;
      const lastChat = newChat[newChat.length - 1];
      const addMessageToLastBaseDate = (chats) => {
        if (chats !== lastChat) return chats;
        return {
          ...chats,
          messages: [...chats.messages, msgObject],
        };
      };
      if (
        isEmptyArr(newChat) ||
        !isInSameDay(lastChat.baseDate, msgObject.timestamp)
      ) {
        messages = [
          ...newChat,
          {
            baseDate: setBaseDate(msgObject.timestamp),
            messages: [msgObject],
          },
        ];
      } else {
        messages = newChat.map(addMessageToLastBaseDate);
      }
      setNewChat(messages);
      goToBottom();
    },
    [newChat],
  );
  useEffect(() => {
    chatSocket.once('message', insertNewMessage);
    return () => chatSocket.off('message');
  }, [insertNewMessage, chatSocket]);

  const onMessageSubmit = (e) => {
    e.preventDefault();
    if (chatInputRef.current.value === '') return;
    chatSocket.emit('message', {
      userId: currentUser,
      content: chatInputRef.current.value,
    });
    chatInputRef.current.value = '';
  };

  // const mockFetch = useCallback(
  //   () =>
  //     new Promise((res) => {
  //       setTimeout(() => {
  //         if (formattedChat[0]) {
  //           res(getConversations(formattedChat[0].baseDate));
  //         } else {
  //           res(getConversations());
  //         }
  //       }, 500);
  //     }),
  //   [formattedChat],
  // );

  // const fetchAndUpdateData = useCallback(async () => {
  //   let result;
  //   try {
  //     result = await mockFetch();
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   const formattedResult = formatChat(result.reverse());
  //   setFormattedChat([...formattedResult, ...formattedChat]);
  // }, [formattedChat, mockFetch]);

  // const fetchOnIntersect = useCallback(
  //   async (E, O) => {
  //     O.unobserve(E.target);
  //     await fetchAndUpdateData();
  //     O.observe(E.target);
  //   },
  //   [fetchAndUpdateData],
  // );

  // const [reloadRef] = useIntersect(fetchOnIntersect, {threshold: 1});

  // useEffect(() => {
  //   if (outerBoxRef.current) {
  //     const currentHeight = outerBoxRef.current.scrollHeight;

  //     if (currentHeight > prevHeight) {
  //       window.scrollTo(0, currentHeight - prevHeight);
  //       setPreveHeight(currentHeight);
  //     }
  //   }
  // }, [formattedChat, prevHeight]);

  return (
    <>
      <List className={classes.root} subheader={<li />} ref={outerBoxRef}>
        {/* <span ref={reloadRef} /> */}

        {/* <ChatSection messagesByDate={formattedChat} currentUser={currentUser} /> */}

        <ChatSection messagesByDate={newChat} currentUser={currentUser} />

        <IconButton
          type='submit'
          className={classes.goToBottomBTN}
          onClick={goToBottom}
          aria-label='search'
          ref={bottomEl}
        >
          <ArrowDownwardIcon />
        </IconButton>

        <span ref={bottomEl} />
      </List>
      <ChatInputField
        onMessageSubmit={onMessageSubmit}
        chatInputRef={chatInputRef}
      />
    </>
  );
}
