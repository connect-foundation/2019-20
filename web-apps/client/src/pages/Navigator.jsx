import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Grid } from '@material-ui/core';
import MainIcon from '@material-ui/icons/HomeOutlined';
import WriteIcon from '@material-ui/icons/Create';
import ChatIcon from '@material-ui/icons/ForumOutlined';
import InfoIcon from '@material-ui/icons/PersonOutlineOutlined';

import { ROUTES } from '../assets/uris';

const Navigator = () => {
  const makeMenuInfo = (uri, icon, label) => ({ uri, icon, label });

  const bottomMenu = [
    makeMenuInfo(ROUTES.MAIN, <MainIcon />, 'main'),
    makeMenuInfo(ROUTES.WRITE, <WriteIcon />, 'write'),
    makeMenuInfo('/service/chat', <ChatIcon />, 'chat'),
    makeMenuInfo(ROUTES.MYPAGE, <InfoIcon />, 'icon'),
  ];
  const menu = bottomMenu.map((info) => (
    <Link to={info.uri} key={info.label}>
      <IconButton aria-label={info.label}>{info.icon}</IconButton>
    </Link>
  ));

  return (
    <AppBar position='fixed' color='inherit' style={{ bottom: 0, top: 'auto' }}>
      <Toolbar>
        <Grid container justify='space-between'>
          {menu}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navigator;
