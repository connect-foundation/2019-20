import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Typography, GridList, GridListTile, CircularProgress, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import FilterIcon from '@material-ui/icons/Tune';
import NotifyIcon from '@material-ui/icons/NotificationsNoneOutlined';

import ActionBar from '../../components/ActionBar';
import ProductListItem from '../../components/ProductListItem';

import getButtons from '../../utils/action-bar';

import { getProductList } from './fetch';
import { filterContext } from '../../contexts/Filters';
import { AlertMessageContext } from '../../contexts/AlertMessage';

import { routes } from '../../assets/uris';

import { isScrollBottom, debounce } from '../../utils';
import useScrollDown from '../../hooks/useScrollDown'
import useWindowResize from '../../hooks/useWindowResize';

const useStyles = makeStyles({
  list: {
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
  const TITLE = '풀';
  const SCROLL_EVENT_DELAY = 200;
  const classes = useStyles({});

  const { filter } = useContext(filterContext);
  const { ACTION_TYPE, dispatchMessage } = useContext(AlertMessageContext);

  const [loading, setLoading] = useState(false);
  const [cols, setCols] = useState(1);
  const [list, setList] = useState([]);
  const [settings, setSettings] = useState({ from: 0, limits: 10 });

  const buttons = [
    getButtons('검색', '/', <SearchIcon />),
    getButtons('필터', '/service/category', <FilterIcon />),
    getButtons('알림', '/', <NotifyIcon />),
  ];

  const findProductsBySettings = () => {
    const loadData = async () => {
      if (loading) {
        return;
      }
      setLoading(true);
      try {
        const result = await getProductList({ ...filter, ...settings });
        setList((state) => [...state, ...result]);
      } catch (e) {
        dispatchMessage({ type: ACTION_TYPE.ERROR, payload: '데이터를 불러오는 중 오류가 발생하였습니다.' })
      }
      setLoading(false);
    };
    loadData();
  };

  useEffect(findProductsBySettings, [settings]);
  const loadNextPage = debounce(() => {
    if (isScrollBottom()) {
      setSettings((state) => ({
        ...state,
        from: state.from + state.limits,
      }));
    }
  }, SCROLL_EVENT_DELAY);
  const reszieWindowEvent = () => {
    setCols(Math.floor(window.innerWidth / 600) + 1);
  };
  useScrollDown(loadNextPage);
  useWindowResize(reszieWindowEvent);

  const address = filter.localname.split(' ');
  const name = address[address.length - 1];
  const headerTitle = (
    <>{TITLE}{filter.localname === '전체' ? '' : ` ~ ${filter.distance}km 까지`}</>
  );
  return (
    <>
      <ActionBar
        leftArea={(
          <Link to={routes.LOCATION_FILTER}>
            <Typography color='primary' variant='subtitle1'>
              {name}
            </Typography>
          </Link>
        )}
        title={headerTitle}
        buttons={buttons}
      />
      <GridList spacing={0} cols={cols} className={classes.list}>
        {(
          list.map(
            ({ id, hits, title, pictures, price, order, distance, interests }) => (
              <GridListTile key={id} className={classes.list}>
                <Link to={`/product/${id}`}>
                  <ProductListItem
                    title={title}
                    image={pictures[0].mobile}
                    area={distance ? `${distance.toFixed(2)}km` : ''}
                    date={order}
                    price={price}
                    hits={hits}
                    interests={interests.length}
                  />
                </Link>
              </GridListTile>
            ))
        )}
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
