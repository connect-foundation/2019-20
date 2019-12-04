import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import SearchIcon from '@material-ui/icons/Search';
import FilterIcon from '@material-ui/icons/Tune';
import NotifyIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { Typography, GridList, GridListTile, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ActionBar from '../components/action-bar';
import DefaultToolBar from '../components/action-bar/types/default';
import getButtons from '../components/action-bar/get-buttons';
import Card from '../components/card';
import dumy from './dumy';
import CATEGORYLABELS from '../utils/fetch';
import PAGETITLE from './page-title';

const isScrollBottom = () =>
  window.innerHeight + window.scrollY >= document.body.offsetHeight;

const useStyles = makeStyles({
  list: {
    borderBottom: '1px solid black',
    height: 'auto !important',
  },
  loading: {
    textAlign: 'center',
    height: 'auto !important',
  }
});

const Main = ({ location = {} }) => {
  const TITLE = PAGETITLE.main;
  const classes = useStyles({});
  const query = queryString.parse(location.search);
  const categories =
    (Object.keys(query).length === 0) ? [...CATEGORYLABELS] : String(query.category).split(',');
  const link = (categories.length > 0) ? `/category?category=${categories.join(',')}` : '/category';
  const buttons = [
    getButtons('검색', '/', <SearchIcon />),
    getButtons('필터', link, <FilterIcon />),
    getButtons('알림', '/', <NotifyIcon />)
  ];

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [settings, setSettings] = useState({
    category: categories,
    from: 0,
    size: 10,
  });

  const temp =
    'https://user-images.githubusercontent.com/38881005/69973260-8f1b4d00-1566-11ea-8d55-be1da311aef8.jpg';
  const date = Date.now() - 1000 * 60 * 24;
  const CardList = list.map(({ title, price }, i) => (
    <GridListTile key={i} className={classes.list}>
      <Card title={title} image={temp} area='삼성동' date={date} price={price} chat={10} interests={11} />
    </GridListTile>
  ));
  const loadData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const result = await dumy(settings.from, settings.size, settings.category);
    setList([...list, ...result]);
    setLoading(false);
  }

  const checkScrollAndUpdateData = () => {
    if (isScrollBottom()) {
      setSettings({ ...settings, from: settings.from + 1 });
    }
  };

  useEffect(() => { loadData(); }, [settings]);
  useEffect(() => {
    window.addEventListener('scroll', checkScrollAndUpdateData);
    return () => {
      window.removeEventListener('scroll', checkScrollAndUpdateData);
    };
  }, []);

  return (
    <>
      <ActionBar
        contents={
          <DefaultToolBar leftArea={<Typography>역삼동</Typography>} title={TITLE} buttons={buttons} />
        }
      />
      <GridList spacing={0} cols={1} className={classes.list}>
        {CardList}

        {loading && (
          <GridListTile className={classes.loading}>
            <CircularProgress />
          </GridListTile>
        )}
      </GridList>
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