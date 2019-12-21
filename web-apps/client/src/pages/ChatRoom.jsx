import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react';
import {useParams} from 'react-router-dom';
import io from 'socket.io-client';

// material ui
import List from '@material-ui/core/List';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

// components
import MessageInputField from '../components/MessageInputField';
import MessageSection from '../components/MessageSection';

// context
import {UserContext} from '../contexts/User';

// utils
import {isInSameDay, isEmptyArr, setBaseDate, formatChat} from '../utils';
import {CHAT} from '../assets/uris';

// material ui style
const useStyles = makeStyles((theme) => ({
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

export default function ChatRoom() {
  const classes = useStyles({});
  // @ts-ignore
  const {user} = useContext(UserContext);
  const {id: roomId} = useParams();

  const [formattedMessages, setFormattedMessages] = useState([]);
  const chatInputRef = useRef(null);
  const outerBoxRef = useRef(null);

  // socket
  const socket = useRef(null);
  const enterRoom = useCallback((_roomId) => {
    socket.current.emit('enterRoom', {_roomId});
  }, []);
  const listenSocketEvent = useCallback((on = '', cb = () => {}) => {
    socket.current.once(on, cb);
  }, []);
  const removeSocketEventListener = useCallback((of = '') => {
    socket.current.off(of);
  }, []);
  const connectSocket = useCallback(() => {
    socket.current = io.connect(CHAT.INIT_PATH);
  }, []);
  const emitNewMessage = useCallback((userId, content) => {
    socket.current.emit('message', {
      userId,
      content,
    });
  }, []);

  const goTo = useCallback((block = 'end', behavior = 'smooth') => {
    if (outerBoxRef.current) {
      outerBoxRef.current.scrollIntoView({
        behavior,
        block,
        inline: 'nearest',
      });
    }
  }, []);

  const insertMessages = useCallback(
    (messages) => {
      setFormattedMessages(formatChat(messages));
      goTo('end', 'auto');
    },
    [goTo],
  );

  const addMessageToLastBaseDate = useCallback(
    (_formattedMessages, _newRawMessage) => {
      const lastChat = _formattedMessages[_formattedMessages.length - 1];
      const addNewMessage = (_chat) => {
        if (_chat !== lastChat) return _chat;
        return {
          ..._chat,
          messages: [..._chat.messages, _newRawMessage],
        };
      };
      return _formattedMessages.map(addNewMessage);
    },
    [],
  );
  const addMessageWithNewBaseDate = useCallback(
    (_chat, _rawMessage) =>
      _chat.concat({
        baseDate: setBaseDate(_rawMessage.timestamp),
        messages: [_rawMessage],
      }),
    [],
  );

  const insertNewMessage = useCallback(
    (newRawMessage) => {
      let messages = null;
      const lastChat = formattedMessages[formattedMessages.length - 1];

      if (
        isEmptyArr(formattedMessages) ||
        !isInSameDay(lastChat.baseDate, newRawMessage.timestamp)
      ) {
        messages = addMessageWithNewBaseDate(formattedMessages, newRawMessage);
      } else {
        messages = addMessageToLastBaseDate(formattedMessages, newRawMessage);
      }

      setFormattedMessages(messages);
      goTo('end');
    },
    [
      addMessageToLastBaseDate,
      addMessageWithNewBaseDate,
      formattedMessages,
      goTo,
    ],
  );

  const onMessageSubmit = (e) => {
    e.preventDefault();
    if (chatInputRef.current.value === '') return;
    const content = chatInputRef.current;
    emitNewMessage(user.id, content.value);
    content.value = '';
  };

  useEffect(() => {
    connectSocket();
    listenSocketEvent('connect', () => {
      enterRoom(roomId);
    });
    return () => removeSocketEventListener('connect');
  }, [
    connectSocket,
    enterRoom,
    listenSocketEvent,
    removeSocketEventListener,
    roomId,
  ]);

  useEffect(() => {
    listenSocketEvent('prevMessages', insertMessages);
    return () => removeSocketEventListener('prevMessages');
  }, [insertMessages, listenSocketEvent, removeSocketEventListener]);

  useEffect(() => {
    listenSocketEvent('message', insertNewMessage);
    return () => removeSocketEventListener('message');
  }, [insertNewMessage, listenSocketEvent, removeSocketEventListener]);

  return (
    <>
      <List className={classes.root} subheader={<li />} ref={outerBoxRef}>
        <MessageSection messagesByDate={formattedMessages} />

        <IconButton
          type='submit'
          className={classes.goToBottomBTN}
          onClick={goTo}
        >
          <ArrowDownwardIcon />
        </IconButton>
      </List>
      <MessageInputField
        onMessageSubmit={onMessageSubmit}
        chatInputRef={chatInputRef}
      />
    </>
  );
}
