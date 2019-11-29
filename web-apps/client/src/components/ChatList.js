import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import {makeStyles} from '@material-ui/core/styles';

import ChatRow from './ChatRow';

const useStyles = makeStyles((theme) => ({
  bottomFix: {
    position: 'absolute',
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '100vh',
    paddingBottom: '5rem',
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
}));

export default function ChatList({messagesByDate = []}) {
  const classes = useStyles();


  return messagesByDate.map((msgs, idx) => {
    const {baseDate, messages} = msgs;
    return (
      <li key={`section-${baseDate}`} className={classes.listSection}>
        <ul className={classes.ul}>
          <ListSubheader className={classes.liHeader}>
            {new Date(baseDate).toLocaleDateString('ko-KR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </ListSubheader>
          {messages.map((message) => (
            <ListItem key={`item-${message.timestamp}`}>
              <ChatRow message={message} />
            </ListItem>
          ))}
        </ul>
      </li>
    );
  });
}
