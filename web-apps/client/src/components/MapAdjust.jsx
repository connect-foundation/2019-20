import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Grid, TextField, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

import KakakoMap from './KakaoMap';
import AddressList from './AddressList';
import ToolBar from './ToolBar';

import getButtons from '../utils/action-bar';
import { KAKAO_API } from '../utils/geolocation';
import { debounce } from '../utils';

const useStyles = makeStyles({
  root: {
    padding: '0.5rem 1.5rem'
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

const MapAdjust = ({ filter, message, title, clearArea, applySettings, arange }) => {
  const SEARCH_DELAY = 500;
  const classes = useStyles({});
  const addressRef = useRef(null);
  const mapRef = useRef(null);

  const [addressList, setAddressList] = useState([]);
  const [distance, setDistance] = useState(filter.distance);
  const [coordinates, setCoordinates] = useState(filter.coordinates);
  const [localname, setLocalname] = useState(filter.localname);

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
    if (event) {
      event.preventDefault();
    }
    mapRef.current.adjustRadius(value);
    setDistance(value);
  };

  const clearAreaEvent = (event) => {
    event.preventDefault();
    setDistance(0);
    setLocalname('');
    mapRef.current.adjustRadius(0);
    clearArea();
  };

  const applySettingsEvent = (event) => {
    event.preventDefault();
    applySettings(event, coordinates, localname, distance);
  };

  // use effect
  useEffect(() => {
    addressRef.current.value = localname;
  }, [localname]);

  useEffect(() => {
    if (mapRef.current) {
      resizeDistnace(null, distance);
    }
  }, [mapRef, distance]);

  const buttons = [];

  if (clearArea) {
    buttons.push(getButtons('취소', null, <ClearIcon />, clearAreaEvent));
  }
  buttons.push(getButtons('적용', null, <CheckIcon />, applySettingsEvent));

  return (
    <>
      <ToolBar title={title} buttons={buttons} />
      <Grid
        container
        direction='column'
        spacing={0}
        className={classes.root}
      >
        {message.length > 0 && (
          <Grid style={({ color: 'tomato' })}>{message}</Grid>
        )}
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
          {arange && (
            <Grid item>
              <Slider
                max={20}
                min={1}
                step={1}
                defaultValue={distance}
                onChange={resizeDistnace}
              />
            </Grid>
          )}
          <Grid item className={classes.map}>
            {
              useMemo(() => (
                <KakakoMap
                  appKey={KAKAO_API}
                  width='100%'
                  height='50vh'
                  callback={updateCurrentPoisiton}
                  ref={mapRef}
                />
              ), [updateCurrentPoisiton])
            }
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

MapAdjust.propTypes = {
  filter: PropTypes.objectOf(PropTypes.shape({
    coordinates: PropTypes.string,
    distance: PropTypes.number,
    localname: PropTypes.string,
  })),
  title: PropTypes.string.isRequired,
  clearArea: PropTypes.oneOfType([PropTypes.func, null]),
  applySettings: PropTypes.func.isRequired,
  message: PropTypes.string,
  arange: PropTypes.bool,
};

MapAdjust.defaultProps = {
  filter: {
    coordinates: '37.499096,127.028099',
    distance: 0,
    localname: '패스트파이브 강남 4호점',
  },
  message: '',
  arange: false,
  clearArea: null,
};

export default MapAdjust;
