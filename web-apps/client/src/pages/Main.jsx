import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';

import {Typography, GridList, GridListTile} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import FilterIcon from '@material-ui/icons/Tune';
import ClearIcon from '@material-ui/icons/Clear';

import ActionBar from '../components/ActionBar';
import ProductListItem from '../components/ProductListItem';
import LoadingProgress from '../components/LoadingCenter';

import getButtons from '../utils/action-bar';

import {getProductList} from '../service/product';
import {filterContext} from '../contexts/Filters';
import {AlertMessageContext} from '../contexts/AlertMessage';
import {SnackbarContext} from '../contexts/SnackBar';

import {ROUTES} from '../assets/uris';

import {isScrollBottom, debounce} from '../utils';
import useScrollDown from '../hooks/useScrollDown';
import useWindowResize from '../hooks/useWindowResize';

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

const MESSAGE = {
  NO_DATA: '더 이상 데이터가 존재하지 않습니다',
  LOAD_LIST_FAIL: '데이터를 불러오는 중 오류가 발생하였습니다.',
};

const Main = () => {
  const TITLE = '풀';
  const SCROLL_EVENT_DELAY = 200;
  const classes = useStyles({});

  const {FILTER_TYPE, filter, dispatchFilter} = useContext(filterContext);
  const {ALERT_ACTION_TYPE, dispatchMessage} = useContext(AlertMessageContext);
  const {setNotice} = useContext(SnackbarContext);

  const [loading, setLoading] = useState(false);
  const [cols, setCols] = useState(1);
  const [list, setList] = useState([]);
  const [settings, setSettings] = useState({from: 0, limits: 10});
  const [noData, setNoData] = useState(false);

  const clearKeyword = (event) => {
    event.preventDefault();
    dispatchFilter({type: FILTER_TYPE.KEYWORD, payload: ''});
    setNotice('검색어가 초기화 되었습니다.');
  };

  const buttons = [
    getButtons('검색', ROUTES.SEARCH, <SearchIcon />),
    getButtons('필터', ROUTES.FILTER, <FilterIcon />),
    getButtons('초기화', null, <ClearIcon />, clearKeyword),
  ];

  const findProductsBySettings = () => {
    const loadData = async () => {
      if (loading) {
        return;
      }
      setLoading(true);
      try {
        const result = await getProductList({...filter, ...settings});
        if (!result.length) {
          setNoData(true);
        }
        setList((state) => [...state, ...result]);
      } catch (e) {
        dispatchMessage({
          type: ALERT_ACTION_TYPE.ERROR,
          payload: MESSAGE.LOAD_LIST_FAIL,
        });
      }
      setLoading(false);
    };
    loadData();
  };

  useEffect(findProductsBySettings, [settings, filter.keyword]);

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
    <>
      {TITLE}
      {filter.localname === '전체' ? '' : ` ~ ${filter.distance}km 까지`}
    </>
  );

  return (
    <>
      <ActionBar
        leftArea={
          <Link to={ROUTES.LOCATION_FILTER}>
            <Typography color='primary' variant='subtitle1'>
              {name}
            </Typography>
          </Link>
        }
        title={headerTitle}
        buttons={buttons}
      />
      {loading && <LoadingProgress />}
      <GridList spacing={0} cols={cols} className={classes.list}>
        {list.map(
          ({id, hits, title, pictures, price, order, distance, interests}) => (
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
          ),
        )}
        {noData && (
          <GridListTile className={classes.list}>
            <div>{MESSAGE.NO_DATA}</div>
          </GridListTile>
        )}
      </GridList>
    </>
  );
};

export default Main;
