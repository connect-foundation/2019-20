import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';

import {
  Typography,
  GridList,
  GridListTile,
  CircularProgress,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import FilterIcon from '@material-ui/icons/Tune';
import NotifyIcon from '@material-ui/icons/NotificationsNoneOutlined';

import ActionBar from '../../components/action-bar';
import Card from '../../components/card';

import getButtons from '../../utils/action-bar';
import {getProductList} from './fetch';
import {filterContext} from '../../contexts/filters';

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
  },
});

const Main = () => {
  const TITLE = '폴';
  const SCROLLEVENTDELAY = 200;
  const classes = useStyles({});

  const filterConsumer = useContext(filterContext);

  const [loading, setLoading] = useState(false);
  const [cols, setCols] = useState(1);
  const [list, setList] = useState([]);
  const [settings, setSettings] = useState({from: 0, limits: 10});

  const buttons = [
    getButtons('검색', '/', <SearchIcon />),
    getButtons('필터', '/service/category', <FilterIcon />),
    getButtons('알림', '/', <NotifyIcon />),
  ];

  const temp =
    'https://user-images.githubusercontent.com/38881005/69973260-8f1b4d00-1566-11ea-8d55-be1da311aef8.jpg';
  const cardListElements = list.map(({id, title, price, order, distance}) => {
    const distanceText = distance ? `${distance.toFixed(2)}km` : '';
    return (
      <GridListTile key={id} className={classes.list}>
        <Card
          title={title}
          image={temp}
          area={distanceText}
          date={order}
          price={price}
          chat={10}
          interests={11}
        />
      </GridListTile>
    );
  });

  const findProductsBySettings = () => {
    const loadData = async () => {
      if (loading) {
        return;
      }
      setLoading(true);
      try {
        const {filter} = filterConsumer;
        const result = await getProductList({...filter, ...settings});
        setList((state) => [...state, ...result]);
      } catch (e) {
        console.log(JSON.stringify(e));
        alert('데이터를 불러오는 중 오류가 발생하였습니다.');
      }
      setLoading(false);
    };
    loadData();
  };

  useEffect(findProductsBySettings, [settings]);

  useEffect(() => {
    let timer;
    const checkScrollAndUpdateData = () => {
      if (isScrollBottom()) {
        if (!timer) {
          timer = setTimeout(() => {
            setSettings((state) => ({
              ...state,
              from: state.from + state.limits,
            }));
            timer = null;
          }, SCROLLEVENTDELAY);
        }
      }
    };
    const reszieWindowEvent = () => {
      setCols(Math.floor(window.innerWidth / 600) + 1);
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

  const {
    filter: {localname, distance},
  } = filterConsumer;
  const address = localname.split(' ');
  const name = address[address.length - 1];

  return (
    <>
      <ActionBar
        leftArea={
          <Link to='/service/location' underline='none'>
            <Typography color='primary' variant='subtitle1'>
              {name}
            </Typography>
          </Link>
        }
        title={
          <>
            {TITLE}
            {localname === '전체' ? '' : ` ~ ${distance}km 까지`}
          </>
        }
        buttons={buttons}
      />
      <GridList spacing={0} cols={cols} className={classes.list}>
        {cardListElements}
        {loading && (
          <GridListTile className={classes.loading}>
            <CircularProgress />
          </GridListTile>
        )}
      </GridList>
    </>
  );
};

export default Main;
