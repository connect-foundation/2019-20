import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import FilterIcon from '@material-ui/icons/Tune';
import NotifyIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { Typography, GridList, GridListTile, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ActionBar from '../components/action-bar';
import DefaultToolBar from '../components/action-bar/types/default';
import getButtons from '../components/action-bar/get-buttons';
import Card from '../components/card';
import { getProductList } from '../utils/fetch';

const isScrollBottom = () =>
  window.innerHeight + window.scrollY >= document.body.offsetHeight;

const useStyles = makeStyles({
  list: {
    borderBottom: '1px solid black',
    '& li': {
      height: 'auto',
    },
  },
  loading: {
    textAlign: 'center',
    height: 'auto !important',
  }
});

const Main = () => {
  const TITLE = '풀';
  const SCROLLEVENTDELAY = 200;
  const classes = useStyles({});
  const buttons = [
    getButtons('검색', '/', <SearchIcon />),
    getButtons('필터', '/category', <FilterIcon />),
    getButtons('알림', '/', <NotifyIcon />)
  ];

  const [loading, setLoading] = useState(false);
  const [cols, setCols] = useState(1);
  const [list, setList] = useState([]);
  const [settings, setSettings] = useState({
    // category: categories,
    from: 0,
    size: 10,
  });

  const temp =
    'https://user-images.githubusercontent.com/38881005/69973260-8f1b4d00-1566-11ea-8d55-be1da311aef8.jpg';
  const CardList = list.map(({ id, title, price, order, }) => {
    return (
      <GridListTile key={id} className={classes.list}>
        <Card title={title} image={temp} area='삼성동' date={order} price={price} chat={10} interests={11} />
      </GridListTile>
    )
  });

  const findProductsBySettings = () => {
    const loadData = async () => {
      if (loading) {
        return;
      }
      setLoading(true);
      try {
        const result = await getProductList(settings);
        setList((state) => [...state, ...result]);
      } catch (e) {
        console.log(JSON.stringify(e));
        alert('데이터를 불러오는 중 오류가 발생하였습니다.');
      }
      setLoading(false);
    };
    loadData();
  }

  useEffect(findProductsBySettings, [settings]);

  useEffect(() => {
    let timer;
    const checkScrollAndUpdateData = () => {
      if (isScrollBottom()) {
        if (!timer) {
          timer = setTimeout(() => {
            setSettings((state) => ({ ...state, from: state.from + state.size }));
            timer = null;
          }, SCROLLEVENTDELAY);
        }
      }
    };
    const reszieWindowEvent = () => {
      setCols(Math.floor(window.innerWidth / 400) + 1);
    };
    checkScrollAndUpdateData();
    reszieWindowEvent();
    window.addEventListener('scroll', checkScrollAndUpdateData);
    window.addEventListener('resize', reszieWindowEvent);
    return () => {
      window.removeEventListener('scroll', checkScrollAndUpdateData);
      window.removeEventListener('resize', reszieWindowEvent);
    };
  }, []);
  return (
    <>
      <ActionBar
        contents={(
          <DefaultToolBar
            leftArea={<Link to='/location'><Typography>전체</Typography></Link>}
            title={TITLE}
            buttons={buttons}
          />
        )}
      />
      <GridList spacing={0} cols={cols} className={classes.list}>
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

export default Main;