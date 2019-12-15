/* eslint-disable camelcase */
import React, { useContext, useState, useRef, useMemo, useEffect } from 'react';

import {
  Grid,
  ListItem,
  TextField,
  List,
  Slider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';

import ToolBar from '../components/tool-bar';
import getButtons from '../utils/action-bar';
import KakakoMap from '../components/kakao-map';

import { filterContext } from '../contexts/filters';
import { SnackbarContext } from '../contexts/snackbar';
import { KAKAO_API } from '../utils/config';

const useStyles = makeStyles({
  addressList: {
    position: 'absolute',
    top: 0,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: '100%',
    height: '100%',
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
  }
});

const AreaPage = () => {
  const TITLE = '검색 범위 설정';
  const classes = useStyles({});
  const addressRef = useRef(null);
  const mapRef = useRef(null);

  const [addressList, setAddressList] = useState([]);
  const {
    TYPE,
    dispatch,
    filter: {
      distance,
      coordinates,
      localname,
    },
  } = useContext(filterContext);
  const { setNotice } = useContext(SnackbarContext);
  const [initialStatus] = useState({
    coordinates: coordinates.split(','),
    radius: distance,
  });

  useEffect(() => {
    if (localname !== '전체') {
      addressRef.current.value = localname;
    }
  }, [localname]);

  const clearArea = (event) => {
    event.preventDefault();
    dispatch({ type: TYPE.DISTANCE, payload: 0 });
    mapRef.current.adjustRadius(0);
    setNotice('전체 지역으로 설정되었습니다.');
  }

  const buttons = [
    getButtons('취소', null, <ClearIcon />, clearArea),
  ];

  const clickAddressList = (event) => {
    const { target: { dataset: { x, y } } } = event;
    mapRef.current.setCenterCoordinates(y, x);
    setAddressList([]);
  };

  const searchAddress = async () => {
    const keyword = addressRef.current.value;
    if (keyword.length === 0) {
      return;
    }
    const result = await mapRef.current.searchAddress(keyword);
    setAddressList(() => result);
  };

  let timer;
  const changeKeyword = () => {
    clearTimeout(timer);
    timer = setTimeout(searchAddress, 1000);
  };

  const kakaoSection = useMemo(() => {
    const updateCurrentPoisiton = ({ lat, lng, name }) => {
      const payload = {
        coordinates: `${lat},${lng}`,
        localname: name,
      };
      dispatch({ type: TYPE.COORDINATE, payload });
    };

    return (
      <KakakoMap
        appKey={KAKAO_API}
        width='100%'
        height='65vh'
        coordinates={initialStatus.coordinates}
        callback={updateCurrentPoisiton}
        radius={initialStatus.radius}
        ref={mapRef}
      />
    );
  }, [TYPE.COORDINATE, dispatch, initialStatus]);

  const onChangeEvent = (e, value) => {
    e.preventDefault();
    mapRef.current.adjustRadius(value);
    dispatch({ type: TYPE.DISTANCE, payload: value });
  };

  return (
    <>
      <ToolBar title={TITLE} buttons={buttons} />
      <Grid
        container
        direction='column'
        spacing={0}
        style={({ margin: '0.5rem 1.5rem' })}
      >
        <Grid container direction='column'>
          <Grid item>
            <TextField
              variant='outlined'
              fullWidth
              placeholder='동명(읍,면)으로 검색 (ex. 서초동)'
              inputRef={addressRef}
              onChange={changeKeyword}
            />
          </Grid>
          <Grid item>
            {distance > 0 && (
              <Slider
                max={20}
                min={1}
                step={1}
                defaultValue={distance}
                onChange={onChangeEvent}
              />
            )}
          </Grid>
          <Grid item style={({ position: 'relative' })}>
            {kakaoSection}
            {addressList.length > 0 && (
              <List className={classes.addressList}>
                {
                  addressList.map(({ address_name, x, y }) => (
                    <ListItem
                      divider
                      key={address_name}
                      data-x={x}
                      data-y={y}
                      onClick={clickAddressList}
                    >
                      {address_name}
                    </ListItem>
                  ))
                }
              </List>
            )}
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