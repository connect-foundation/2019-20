import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {
  Grid,
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

import PrettoSlider from '../components/PrettoSlider';
import InlineItems from '../components/InlineItems';
import ActionBar from '../components/ActionBar';
import LogoutButton from '../components/LogOutButton';
import GithubLogInButton from '../components/GithubLogInButton';

import {AlertMessageContext} from '../contexts/AlertMessage';
import {UserContext} from '../contexts/User';

import {deleteUser} from '../utils/apiCall';
import {isLoggedIn} from '../utils/auth';
import {findAddressByCoordinates} from '../utils/geolocation';
import {ROUTES} from '../assets/uris';

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
  reputation: {
    padding: '2rem 2rem 0 2rem',
  },
  labelButton: {
    backgroundColor: '#1db000',
  },
});

const MESSAGE = {
  LOAD_LOCATION: '현재 주소를 읽고있습니다.',
  LOAD_LOCATION_FAIL: '주소 정보를 읽을 수 없습니다',
  FORBIDEN: '로그인한 사용자만 접근 가능합니다.',
};

const LabledIconButton = (item) => {
  const [icon, label, link] = item;
  return (
    <Link to={link}>
      <IconButton>
        <Avatar>{icon}</Avatar>
      </IconButton>
      <Typography>{label}</Typography>
    </Link>
  );
};

const MyPage = () => {
  const classes = useStyles({});

  const {user, dispatchUser, USER_ACTION_TYPE} = useContext(UserContext);
  const {dispatchMessage, ALERT_ACTION_TYPE} = useContext(AlertMessageContext);
  const [address, setAddress] = useState(MESSAGE.LOAD_LOCATION);

  const correctUser = (member) => isLoggedIn(member);

  useEffect(() => {
    if (!correctUser(user)) {
      return;
    }
    const getAddress = async () => {
      try {
        const {latitude, longitude} = user;
        // x = longitude, y = latitude (카카오 api 명세 /#services_Geocoder_coord2RegionCode)
        const name = await findAddressByCoordinates(longitude, latitude);
        setAddress(name);
      } catch (e) {
        setAddress(MESSAGE.LOAD_LOCATION_FAIL);
      }
    };
    getAddress();
  }, [user, setAddress]);

  if (!correctUser(user)) {
    return (
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{height: '100vh'}}
      >
        <GithubLogInButton />
      </Grid>
    );
  }

  const grade = (user.reputation / user.numberOfRater).toFixed(2);
  const lastName = user.name[0];
  const firstName = user.name.slice(1);

  const buttons = [
    [<SellIcon />, '판매 내역', ROUTES.SELL_LIST],
    [<BuyIcon />, '구매 내역', ROUTES.BUY_LIST],
    [<FavoriteIcon />, '찜한 내역', ROUTES.FAVORITE_LIST],
  ].map(LabledIconButton);

  const leaveHere = async (event) => {
    event.preventDefault();
    try {
      await deleteUser();
    } catch (e) {
      dispatchMessage({
        type: ALERT_ACTION_TYPE.ERROR,
        payload: MESSAGE.LOAD_LOCATION_FAIL,
      });
    }
    dispatchUser({type: USER_ACTION_TYPE.NOT_LOG_IN});
  };

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
        <ListItem className={classes.reputation}>
          <PrettoSlider value={grade} max={10} valueLabelDisplay='on' />
        </ListItem>
        <ListItem divider>
          <InlineItems items={buttons} />
        </ListItem>
        <ListItem divider className='card'>
          <LocatonIcon /> 내 동네 설정(준비중) - {address}
        </ListItem>
        <ListItem divider className='card'>
          <LogoutButton />
        </ListItem>
        <ListItem divider className='card' onClick={leaveHere}>
          <DeleteIcon /> 회원 탈퇴
        </ListItem>
      </List>
    </>
  );
};

export default MyPage;
