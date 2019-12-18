import React, {useState, useRef, useMemo, useContext} from 'react';

import {Link} from 'react-router-dom';

import {ListItem, TextField, List, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {AlertMessageContext} from '../contexts/AlertMessage';
import {UserContext} from '../contexts/User';

import ToolBar from '../components/ToolBar';
import KakakoMap from '../components/KakaoMap';

import {KAKAO_API} from '../utils/config';
import {addUser} from '../utils/apiCall';

const useStyles = makeStyles({
  addressList: {
    position: 'absolute',
    top: 0,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: '100%',
    height: '100%',
  },
  confirmButton: {
    background: '#1db000',
    color: 'white',
  },
  link: {
    textDecoration: 'none',
    position: 'absolute',
    right: '1.5rem',
  },
});

const AreaPage = () => {
  const TITLE = '우리 동네 등록';
  const classes = useStyles({});
  const addressRef = useRef(null);
  const mapRef = useRef(null);

  const {setUser} = useContext(UserContext);
  const {setAlertMessage} = useContext(AlertMessageContext);

  const [addressList, setAddressList] = useState([]);

  const [location, setLocation] = useState({
    coordinates: [37.499096, 127.028099],
    name: '패스트파이브 강남 4호점',
  });

  const enrollLocation = async () => {
    const [latitude, longitude] = location.coordinates;
    try {
      const user = await addUser({latitude, longitude});
      setUser(user);
    } catch (err) {
      if (err.message === 400) {
        setAlertMessage('이미 가입한 회원입니다. 다시 로그인 해 주세요.');
      } else if (err.message === 500) {
        setAlertMessage('서버 에러입니다. 잠시 후 다시 시도 해 주세요.');
      }
    }
  };

  const clickAddressList = (event) => {
    const {
      target: {
        dataset: {x, y},
      },
    } = event;
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
    const updateCurrentPosition = ({lat, lng, name}) => {
      const payload = {
        coordinates: [lat, lng],
        areaName: name,
      };
      setLocation(payload);
    };

    return (
      <KakakoMap
        appKey={KAKAO_API}
        width='100%'
        height='65vh'
        coordinates={location.coordinates}
        callback={updateCurrentPosition}
        ref={mapRef}
      />
    );
  }, [location]);

  return (
    <>
      <ToolBar title={TITLE} />
      <div style={{margin: '0.5rem 1.5rem', width: '100%'}}>
        <h4 style={{color: 'tomato'}}>
          동네를 등록해야 회원가입이 완료됩니다.
        </h4>
        <TextField
          variant='outlined'
          fullWidth
          placeholder='동명(읍,면)으로 검색 (ex. 서초동)'
          inputRef={addressRef}
          onChange={changeKeyword}
        />
        <div style={{position: 'relative'}}>
          {kakaoSection}
          {addressList.length > 0 && (
            <List className={classes.addressList}>
              {addressList.map(({address_name, x, y}) => (
                <ListItem
                  divider
                  key={address_name}
                  data-x={x}
                  data-y={y}
                  onClick={clickAddressList}
                >
                  {address_name}
                </ListItem>
              ))}
            </List>
          )}
        </div>
        <Link to='/service/main' className={classes.link}>
          <Button
            className={classes.confirmButton}
            variant='contained'
            onClick={enrollLocation}
          >
            확인
          </Button>
        </Link>
      </div>
    </>
  );
};

export default AreaPage;
