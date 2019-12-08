/* eslint-disable camelcase */
import React, { useState, useRef, useEffect } from 'react';
import { Grid, GridList, GridListTile, InputBase, Button } from '@material-ui/core';
import { KAKAO_API } from '../utils/config';
import ActionBar from '../components/action-bar';
import ToolBar from '../components/action-bar/types/activity-layor';
import KakakoMap from '../components/kakao-map';
import MAPTYPE from '../components/kakao-map/type';

const AreaPage = () => {
  const TITLE = '내 동네 찾기';
  const addressRef = useRef(null);
  const [mapInfo, setMapInfo] = useState({ latitude: 0, longitude: 0, keyword: '' });
  const [list, setList] = useState([]);
  const [cols, setCols] = useState(2);
  const [coords, setCoords] = useState({ depth3: '전체', lat: 0, lng: 0 });
  const setMap = ({ latitude = 0, longitude = 0, keyword = '' }) =>
    ({ latitude, longitude, keyword });

  useEffect(() => {
    const reszieWindowEvent = () => {
      if (window.innerWidth < 500) {
        setCols(1);
      } else {
        setCols(2);
      }
    };
    reszieWindowEvent();
    window.addEventListener('resize', reszieWindowEvent);
    return () => {
      window.removeEventListener('resize', reszieWindowEvent);
    }
  }, []);

  const setCurrentCoordsEvent = (event) => {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition((point) => {
      setMapInfo(setMap({
        latitude: point.coords.latitude,
        longitude: point.coords.longitude
      }));
    });
  };

  const callback = (type, result) => {
    if (type === MAPTYPE.COORDINATE) {
      setList([]);
      setCoords(result);
      if (!addressRef.current) {
        return;
      }
      addressRef.current.value = result.name;
    } else if (type === MAPTYPE.ADDRESS) {
      setList([...result]);
    }
  };

  const changeArea = (lat, lng) => () => {
    setMapInfo(setMap({
      latitude: +lat,
      longitude: +lng,
    }));
  };

  const area = list.map(({ address: { address_name, x, y } }) => (
    <GridListTile key={address_name} style={({ borderBottom: '1px solid black', padding: '1rem' })} onClick={changeArea(y, x)}>
      <>{address_name}</>
    </GridListTile>
  ));

  const onChangeEvent = (event) => {
    event.preventDefault();
    const { target: { value } } = event;
    setMapInfo(setMap({ keyword: value }));
  };

  return (
    <>
      <ActionBar
        contents={
          <ToolBar link={`/?area=${coords.depth3},${coords.lat},${coords.lng}`} title={TITLE} />
        }
      />
      <Grid
        container
        style={({ padding: '2rem' })}
        direction='column'
        spacing={0}
      >
        <GridList cols={cols} cellHeight='auto'>
          <GridListTile>
            <Grid item>
              <InputBase fullWidth placeholder="동명(읍,면)으로 검색 (ex. 서초동)" inputRef={addressRef} onChange={onChangeEvent} />
            </Grid>
            <Grid item>
              <Button fullWidth variant="contained" style={({ backgroundColor: '#f4690b', color: 'white' })} onClick={setCurrentCoordsEvent}>
                현재위치로 찾기
              </Button>
            </Grid>
            <Grid item>
              <KakakoMap
                appKey={KAKAO_API}
                width='100%'
                height='50vh'
                latitude={mapInfo.latitude}
                longitude={mapInfo.longitude}
                keyword={mapInfo.keyword}
                callback={callback}
              />
            </Grid>
          </GridListTile>
          <GridListTile>
            <GridList cellHeight='auto' cols={1}>
              {area}
            </GridList>
          </GridListTile>
        </GridList>
      </Grid>
    </>
  )
};

export default AreaPage;