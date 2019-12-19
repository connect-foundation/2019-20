import React, { useContext, useState, useRef, useEffect, useCallback } from 'react';

import { Grid, TextField, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

import ToolBar from '../components/ToolBar';
import KakakoMap from '../components/KakaoMap';
import AddressList from '../components/AddressList';
import getButtons from '../utils/action-bar';

import { filterContext } from '../contexts/Filters';
import { SnackbarContext } from '../contexts/SnackBar';
import { KAKAO_API } from '../utils/config';
import { debounce } from '../utils';

const MESSAGE = {
  CLEAR: '전체지역으로 초기화되었습니다.',
  SET: '정상적으로 설정되었습니다',
};

const useStyles = makeStyles({
  root: {
    margin: '0.5rem 1.5rem'
  },
  distance: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: '#1db000cc',
    padding: '0.5rem 1rem',
    fontWeight: 'bold',
    color: 'white',
    borderRadius: '0.5rem',
  },
  map: {
    position: 'relative',
  },
});

const AreaPage = () => {
  const SEARCH_DELAY = 500;
  const TITLE = '검색 범위 설정';
  const classes = useStyles({});
  const addressRef = useRef(null);
  const mapRef = useRef(null);

  const { FILTER_TYPE, dispatchFilter, filter } = useContext(filterContext);
  const { setNotice } = useContext(SnackbarContext);
  const [addressList, setAddressList] = useState([]);
  const [distance, setDistance] = useState(filter.distance);
  const [coordinates, setCoordinates] = useState(filter.coordinates);
  const [localname, setLocalname] = useState(filter.localname);

  useEffect(() => {
    addressRef.current.value = localname;
  }, [localname]);

  // event
  const searchAddress = useCallback(debounce(async () => {
    const keyword = addressRef.current.value;
    if (keyword.length === 0) {
      return;
    }
    const result = await mapRef.current.searchAddress(keyword);
    setAddressList(result);
  }, SEARCH_DELAY), []);

  const updateCurrentPoisiton = useCallback(({ lat, lng, name }) => {
    setCoordinates(`${lat},${lng}`);
    setLocalname(name);
  }, [setCoordinates, setLocalname]);

  const changeCurrentAddress = (event) => {
    const { target: { dataset: { x, y } } } = event;
    mapRef.current.setCenterCoordinates(y, x);
    setAddressList([]);
  };

  const resizeDistnace = (event, value) => {
    event.preventDefault();
    mapRef.current.adjustRadius(value);
    setDistance(value);
  };

  const clearArea = (event) => {
    event.preventDefault();
    dispatchFilter({ type: FILTER_TYPE.DISTANCE, payload: 0 });
    setDistance(0);
    setLocalname('');
    mapRef.current.adjustRadius(0);
    setNotice(MESSAGE.CLEAR);
  };

  const applySettings = (event) => {
    event.preventDefault();
    dispatchFilter({ type: FILTER_TYPE.DISTANCE, payload: distance });
    dispatchFilter({
      type: FILTER_TYPE.COORDINATE, payload: {
        coordinates, localname,
      }
    });
    setNotice(MESSAGE.SET);
  };

  const buttons = [
    getButtons('취소', null, <ClearIcon />, clearArea),
    getButtons('적용', null, <CheckIcon />, applySettings),
  ];

  return (
    <>
      <ToolBar title={TITLE} buttons={buttons} />
      <Grid
        container
        direction='column'
        spacing={0}
        className={classes.root}
      >
        <Grid container direction='column'>
          <Grid item>
            <TextField
              variant='outlined'
              fullWidth
              placeholder='동명(읍,면)으로 검색 (ex. 서초동)'
              inputRef={addressRef}
              onChange={searchAddress}
            />
          </Grid>
          <Grid item>
            <Slider
              max={20}
              min={1}
              step={1}
              defaultValue={distance}
              onChange={resizeDistnace}
            />
          </Grid>
          <Grid item className={classes.map}>
            <KakakoMap
              appKey={KAKAO_API}
              width='100%'
              height='60vh'
              callback={updateCurrentPoisiton}
              ref={mapRef}
            />
            <AddressList list={addressList} onClick={changeCurrentAddress} />
            <div className={classes.distance}>
              {distance}Km
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
};

export default AreaPage;
