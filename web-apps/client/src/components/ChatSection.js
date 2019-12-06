import React from 'react';
import {arrayOf} from 'prop-types';
// material ui
import {makeStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';

// components
import ChatList from './ChatList';

// utils
import {getKoKRFormatFullDate} from '../utils';

// types
import {uIdType, messagesByDateShape} from '../types';

// material ui style
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
  header: {
    textAlign: 'center',
  },
}));

// component
const ChatSection = ({messagesByDate, currentUser}) => {
  const classes = useStyles({});
  return messagesByDate.map(({baseDate, messages}) => (
    <li key={`section-${baseDate}`} className={classes.listSection}>
      <ul className={classes.ul}>
        <ListSubheader className={classes.header}>{getKoKRFormatFullDate(baseDate)}</ListSubheader>
        <ChatList messages={messages} currentUser={currentUser} />
      </ul>
    </li>
  ));
};

ChatSection.propTypes = {
  messagesByDate: arrayOf(messagesByDateShape),
  currentUser: uIdType,
};

ChatSection.defaultProps = {
  messagesByDate: [],
  currentUser: null,
};

export default ChatSection;
