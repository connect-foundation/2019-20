import React, {useState, useEffect, useRef, useCallback} from 'react';
import List from '@material-ui/core/List';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CircularProgress from '@material-ui/core/CircularProgress';
import useIntersect from '../hooks/useIntersect';
// components
import ChatInputField from './ChatInputField';
import ChatList from './ChatList';

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

const getConversations = (startTime = new Date()) => {
  const startDate = new Date(startTime);
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return new Array(30)
    .fill(0)
    .map((_, i) => i)
    .reduce((acc, cur, idx) => {
      const baseDate = new Date(startDate.setDate(startDate.getDate() - idx));
      return [
        ...acc,
        {
          id: getRandomInt(0, 2),
          message:
            'Proactively implement interoperable products through cross-media schemas. Completely network goal-oriented benefits without unique ideas. ',
          timestamp: baseDate.setHours(baseDate.getHours() - 1),
        },
        {
          id: getRandomInt(0, 2),
          message:
            'Dramatically innovate impactful supply chains without adaptive innovation. Proactively impact ',
          timestamp: baseDate.setHours(baseDate.getHours() - 2),
        },
        {
          id: getRandomInt(0, 2),
          message: 'this is left',
          timestamp: baseDate.setHours(baseDate.getHours() - 3),
        },
      ];
    }, []);
};

const formatChat = (rowChat = []) => {
  const result = [];
  rowChat.forEach((chat) => {
    const chatTime = new Date(chat.timestamp);
    const lastChat = result[result.length - 1];
    if (
      result.length < 1 ||
      new Date(lastChat.baseDate).toDateString() !== chatTime.toDateString()
    ) {
      result.push({
        baseDate: chatTime.setHours(0, 0, 0, 0),
        messages: [chat],
      });
    } else {
      lastChat.messages.push(chat);
    }
  });
  return result;
};

export default function Chat() {
  const classes = useStyles();
  const [formattedChat, setFormattedChat] = useState([]);
  const [reloadRef, entry] = useIntersect({threshold: 1});
  const [isLoading, setIsLoading] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(null);

  const chatInputRef = useRef(null);
  const bottomEl = useRef(null);
  const outerBoxRef = useRef(null);

  const updateChat = useCallback(
    (formattedResult) => {
      setFormattedChat([...formattedResult, ...formattedChat]);
    },
    [formattedChat],
  );
  const genNewChat = useCallback(() => formattedChat[0], [formattedChat]);

  useEffect(() => {
    if (bottomEl.current) {
      bottomEl.current.scrollIntoView({behavior: 'auto'});
    }
  }, []);

  useEffect(() => {
    const mockFetch = () =>
      new Promise((res) => {
        setTimeout(() => {
          if (genNewChat()) {
            res(getConversations(genNewChat().baseDate));
          } else {
            res(getConversations());
          }
        }, 500);
      });

    let ignore = false;

    const fetchAndUpdateData = async () => {
      let result;
      try {
        result = await mockFetch();
      } catch (error) {
        console.log(error);
      }
      if (!ignore) {
        console.log('t', new Date().toISOString());
        const formattedResult = formatChat(result.reverse());
        updateChat(formattedResult);
        setIsLoading(false);
        setScrollHeight(outerBoxRef.current.scrollHeight);
      }
    };

    if (entry.isIntersecting) {
      setIsLoading(true);
      fetchAndUpdateData();
    }
    return () => {
      ignore = true;
    };
  }, [entry.isIntersecting, updateChat, genNewChat]);

  useEffect(() => {
    const currentHeight = outerBoxRef.current.scrollHeight;
    console.log(currentHeight, scrollHeight);
    if (scrollHeight === null) {
      setScrollHeight(currentHeight);
    } else if (currentHeight > scrollHeight) {
      window.scrollTo(0, currentHeight - scrollHeight);
    }
  }, [formattedChat, scrollHeight]);

  const goToTop = () => {
    if (bottomEl.current) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }
  };
  const goToBottom = () => {
    if (bottomEl.current) {
      window.scrollTo({
        behavior: 'smooth',
        top: bottomEl.current.offsetTop,
      });
    }
  };
  const insertNewMessage = (message, timestamp = new Date()) => {
    const lastChat = formattedChat[formattedChat.length - 1];

    if (
      formattedChat.length < 1 ||
      new Date(lastChat.baseDate).toDateString() !== timestamp.toDateString()
    ) {
      setFormattedChat([
        ...formattedChat,
        {
          baseDate: timestamp.setHours(0, 0, 0, 0),
          messages: [message],
        },
      ]);
    } else {
      setFormattedChat(
        formattedChat.map((chats) => {
          if (chats === lastChat) {
            return {
              ...chats,
              messages: [
                ...chats.messages,
                {
                  id: 1,
                  message,
                  timestamp,
                },
              ],
            };
          }
          return chats;
        }),
      );
    }
    goToBottom();
  };
  const onMessageSubmit = (e) => {
    e.preventDefault();
    insertNewMessage(chatInputRef.current.value);
    chatInputRef.current.value = '';
  };

  return (
    <>
      <List className={classes.root} subheader={<li />} ref={outerBoxRef}>
        {isLoading && <CircularProgress />}
        <span ref={reloadRef} />

        <ChatList messagesByDate={formattedChat} />

        <IconButton
          type='submit'
          className={classes.goToBottomBTN}
          onClick={goToBottom}
          aria-label='search'
          ref={bottomEl}
        >
          <ArrowDownwardIcon />
        </IconButton>
        {/* 
        <button type='button' ref={bottomEl} onClick={goToTop}>
          go to top
        </button> */}
        <span ref={bottomEl} />
      </List>
      <ChatInputField
        onMessageSubmit={onMessageSubmit}
        chatInputRef={chatInputRef}
      />
    </>
  );
}
