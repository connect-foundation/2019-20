import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import SearchIcon from '@material-ui/icons/Search';
import FilterIcon from '@material-ui/icons/Tune';
import NotifyIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { Typography } from '@material-ui/core';
import ActionBar from '../components/action-bar';
import DefaultToolBar from '../components/action-bar/types/default';
import getButtons from '../components/action-bar/get-buttons';


const Main = ({ location = {} }) => {
  const query = queryString.parse(location.search);
  const categories =
    (Object.keys(query).length === 0) ? [] : String(query.category).split(',');
  const link = (categories.length > 0) ? `/category?category=${categories.join(',')}` : '/category';
  const buttons = [
    getButtons('검색', '/', <SearchIcon />),
    getButtons('필터', link, <FilterIcon />),
    getButtons('알림', '/', <NotifyIcon />)
  ];

  return (
    <>
      <ActionBar
        contents={
          <DefaultToolBar leftArea={<Typography>역삼동</Typography>} title='폴' buttons={buttons} />
        }
      />
    </>
  )
};

Main.propTypes = {
  location: PropTypes.objectOf(PropTypes.string),
};

Main.defaultProps = {
  location: {},
};

export default Main;