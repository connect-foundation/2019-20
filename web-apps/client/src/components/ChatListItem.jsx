import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// material ui
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import {UserContext} from '../contexts/User';
import {ROUTES} from '../assets/uris';

// types
import {chatRoomListType} from '../types';

const ChatListItem = (props) => {
  const {data, index, style} = props;
  // @ts-ignore
  const {user} = useContext(UserContext);
  const chat = data[index];
  const messageLength = chat.messages.length;
  const lastMessage = chat.messages[messageLength - 1];
  const getOtherPersonName = (_chat, uId) =>
    _chat.seller._id === uId ? _chat.buyer.name : _chat.seller.name;

  if (!chat) return null;
  return (
    <Link to={ROUTES.getChatRoomPath(chat._id)}>
      <ListItem
        button
        style={{
          ...style,
          borderBottom: '1px solid grey',
        }}
        key={index}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${chat.product.pictures[0].mobile})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }}
            >
              {/* <img
                style={{
                  margin: 'auto',
                  display: 'block',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
                alt='complex'
                src={chat.product.pictures[0].mobile}
              /> */}
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom variant='subtitle1'>
              {chat.product.title}
            </Typography>
            <Typography variant='body2' gutterBottom>
              {getOtherPersonName(chat, user.id)}
            </Typography>

            <Grid item>
              <Typography variant='body2' color='textSecondary' noWrap>
                {lastMessage && lastMessage.content}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
    </Link>
  );
};

ChatListItem.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  data: chatRoomListType.isRequired,
};

export default ChatListItem;
