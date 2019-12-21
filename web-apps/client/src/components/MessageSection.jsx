import React from 'react';
import {arrayOf} from 'prop-types';
// material ui
import {makeStyles} from '@material-ui/core/styles';

// components
import MessageList from './MessageList';
import SectionHeader from './SectionHeader';

// utils
import {getKoKRFormatFullDate} from '../utils';

// types
import {uIdType, messagesByDateShape} from '../types';

// material ui style
const useStyles = makeStyles((theme) => ({
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

// component
const MessageSection = ({messagesByDate, currentUser}) => {
  const classes = useStyles({});
  return messagesByDate.map(({baseDate, messages}) => (
    <li key={`section-${baseDate}`} className={classes.listSection}>
      <ul className={classes.ul}>
        <SectionHeader content={getKoKRFormatFullDate(baseDate)} />
        <MessageList messages={messages} currentUser={currentUser} />
      </ul>
    </li>
  ));
};

MessageSection.propTypes = {
  messagesByDate: arrayOf(messagesByDateShape),
  currentUser: uIdType,
};

MessageSection.defaultProps = {
  messagesByDate: [],
  currentUser: null,
};

export default MessageSection;
