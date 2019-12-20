import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

import {
  Avatar,
  ListItem,
  List,
  Typography,
  IconButton,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import FavoriteIcon from '@material-ui/icons/Favorite';
import SellIcon from '@material-ui/icons/LocalMall';
import BuyIcon from '@material-ui/icons/Receipt';
import LocatonIcon from '@material-ui/icons/LocationOn';
import DeleteIcon from '@material-ui/icons/Delete';
import LogoutIcon from '@material-ui/icons/ExitToApp';

import PrettoSlider from '../components/PrettoSlider';
import InlineItems from '../components/InlineItems';
import ActionBar from '../components/ActionBar';
import LogoutButton from '../components/LogOutButton';

import {UserContext} from '../contexts/User';

const useStyles = makeStyles({
  root: {
    width: '100%',
    '& .MuiAvatar-root': {
      backgroundColor: '#1db000',
      color: 'white',
    },
    '& .card': {
      padding: '1.5rem',
    },
  },
});

const LabledIconButton = (item) => {
  const [icon, label, link] = item;
  return (
    <Link to={link}>
      <IconButton>
        <Avatar style={{backgroundColor: '#1db000'}}>{icon}</Avatar>
      </IconButton>
      <Typography>{label}</Typography>
    </Link>
  );
};

const MyPage = () => {
  const {user} = useContext(UserContext);
  const classes = useStyles({});

  const grade =
    user &&
    user.numberOfRater > 0 &&
    (user.reputation / user.numberOfRater).toFixed(2);
  const lastName = '가'; // user.name[0];
  const firstName = '나다'; //user.name.slice(1);

  const buttons = [
    [<SellIcon />, '판매 내역', '/my-article'],
    [<BuyIcon />, '구매 내역', '/buy-list'],
    [<FavoriteIcon />, '찜한 내역', '/favorite-list'],
  ].map(LabledIconButton);

  return (
    <>
      <ActionBar title='나의 정보' />
      <List dense className={classes.root}>
        <ListItem>
          <Avatar>{lastName}</Avatar>
          <strong>{firstName}님</strong>
        </ListItem>
        <ListItem>
          #{user && user.authority} #{user && user.email}
        </ListItem>
        <ListItem style={{padding: '2rem 0.5rem 0 0.5rem'}}>
          <PrettoSlider value={grade} max={10} valueLabelDisplay='on' />
        </ListItem>
        <ListItem divider>
          <InlineItems items={buttons} />
        </ListItem>
        <ListItem divider className='card'>
          <Link to='/location'>
            <LocatonIcon /> 내 동네 설정
          </Link>
        </ListItem>
        <ListItem divider className='card'>
          <LogoutIcon /> <LogoutButton />
        </ListItem>
        <ListItem divider className='card'>
          <DeleteIcon /> 회원 탈퇴
        </ListItem>
      </List>
    </>
  );
};

export default MyPage;
