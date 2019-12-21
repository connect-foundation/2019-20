import React, {
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { IconButton, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GpsIcon from '@material-ui/icons/GpsFixed';

import useLoadScript from '../hooks/useLoadScript';

import { debounce } from '../utils';

const MESSAGE = {
  ZERO_RESULT: '검색결과가 없습니다',
  ERROR: '서버와 통신에 실패하였습니다.',
  NOT_LOADED: 'api가 현재 로드되지 않았습니다. 잠시후에 시도해주세요',
  GET_GEOLCATION_ERROR: '현재 위치정보를 불러올 수 없습니다. 위치 정보 접근 권한이 필요합니다.',
};

const useStyles = makeStyles({
  root: {
    position: 'relative'
  },
  currentButton: {
    position: 'absolute',
    zIndex: 10,
    right: 0,
    top: 0,
  },
  map: (props) => ({
    width: props.width,
    height: props.height,
  }),
});

/**
 * 카카오 지도 API
 * @description 카카오 지도 API를 그리고, 해당 API로부터
 * 주소를 검색하거나, 현재 지도 위치의 주소를 검색합니다.
 * @example
 * searchAddress(주소명) : 주소값 반환
 * adjustRadius(반지름) : 지도중심에서 원그리기
 * setCenterCoordinates(lat, lng) : 중심좌표 설정
 * getAddressByCoordinates(lat, lng) : 주소값 반한
 * getCurretCoordinates: 현재 중심좌표 반환
 */
const KakaoMap = ({ appKey, width, height, callback }, ref) => {
  const SEARCH_DELAY = 1000;
  const KAKAOAPIURL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services,drawing,clusterer`;
  const KILLOMETER = 1000;
  const classes = useStyles({ width, height });
  const scriptLoadingStatus = useLoadScript(KAKAOAPIURL);
  const drawingArea = useRef(null);
  const mapObjects = useRef(null);
  const [initialRadius, setInitialRadius] = useState(0);

  const isLoadedKakaoApi = () => {
    if (!mapObjects.current) {
      return false;
    }
    return Object.keys(mapObjects.current).length !== 0;
  }

  useImperativeHandle(ref, () => ({
    searchAddress: (address) => {
      return new Promise((resolve, reject) => {
        if (!isLoadedKakaoApi()) {
          reject(MESSAGE.NOT_LOADED);
        }
        const { geocoder } = mapObjects.current;
        geocoder.addressSearch(address, (result) => {
          resolve(result);
        });
      });
    },
    adjustRadius: (distance) => {
      if (!isLoadedKakaoApi()) {
        setInitialRadius(distance);
        return;
      }
      const { circle, map } = mapObjects.current;
      circle.setPosition(map.getCenter());
      circle.setRadius(distance * KILLOMETER);
    },
    setCenterCoordinates: (lat, lng) => {
      if (!isLoadedKakaoApi()) {
        throw Error(MESSAGE.NOT_LOADED);
      }
      const { geocoder, map, kakao } = mapObjects.current;
      geocoder.coord2RegionCode(lng, lat, (result, status) => {
        if (status !== kakao.maps.services.Status.OK) {
          return;
        }
        map.setCenter(new kakao.maps.LatLng(lat, lng));
      });
    },
    getAddressByCoordinates: (lat, lng) => {
      if (!isLoadedKakaoApi()) {
        throw Error(MESSAGE.NOT_LOADED);
      }
      mapObjects.current.getCurrentAddressByCoordinates(lat, lng);
    },
    getCurretCoordinates: () => {
      if (!isLoadedKakaoApi()) {
        throw Error(MESSAGE.NOT_LOADED);
      }
      const center = mapObjects.current.map.getCenter();
      const lat = center.getLat();
      const lng = center.getLng();
      return [lat, lng];
    }
  }));

  const setCurrentCoordinates = useCallback(() => {
    navigator.geolocation.getCurrentPosition((point) => {
      const { coords: { latitude, longitude } } = point;
      ref.current.setCenterCoordinates(latitude, longitude);
    }, () => {
      alert(MESSAGE.GET_GEOLCATION_ERROR);
    });
  }, [ref]);

  useEffect(() => {
    if (!scriptLoadingStatus) {
      return;
    }
    const { kakao } = window;
    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();
      const container = drawingArea.current;
      const position = new kakao.maps.LatLng(0, 0);
      const marker = new kakao.maps.Marker({ position });
      const map = new kakao.maps.Map(container, { center: position, level: 10 });
      const circle = new kakao.maps.Circle({
        fillColor: '#000000',
        fillOpacity: 0.5,
        radius: initialRadius * KILLOMETER,
      });
      marker.setMap(map);
      circle.setMap(map);
      map.setDraggable(true);

      setCurrentCoordinates();

      // 좌표 값에 해당하는 행정동, 법정동 정보 callback 반환
      const getCurrentAddressByCoordinates = (lat, lng) => {
        geocoder.coord2RegionCode(lng, lat, (result, status) => {
          const { ZERO_RESULT, ERROR } = kakao.maps.services.Status;
          if (!callback) {
            return;
          }
          switch (status) {
            case ZERO_RESULT:
              callback({ lat, lng, name: MESSAGE.ZERO_RESULT });
              break;
            case ERROR:
              callback({ lat, lng, name: MESSAGE.ERROR });
              break;
            default: {
              const name = result[0].address_name;
              callback({ lat, lng, name });
              break;
            }
          }
        });
      };

      const getAddressByCoordinates =
        debounce(getCurrentAddressByCoordinates, SEARCH_DELAY);

      // 마커 위치, 원 현재 지도 중심 위치로 재조정
      const centerChangedEvent = () => {
        const center = map.getCenter();
        const lat = center.getLat();
        const lng = center.getLng();
        getAddressByCoordinates(lat, lng);
        marker.setPosition(center);
        circle.setPosition(center);
      };

      mapObjects.current = {
        kakao, geocoder, marker, circle, map, getCurrentAddressByCoordinates,
      };

      kakao.maps.event.addListener(map, 'center_changed', centerChangedEvent);
    });
  }, [callback, initialRadius, scriptLoadingStatus, setCurrentCoordinates]);

  if (!scriptLoadingStatus) {
    return <CircularProgress />;
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={setCurrentCoordinates}
        className={classes.currentButton}
      >
        <GpsIcon />
      </IconButton>
      <div ref={drawingArea} className={classes.map} />
    </div>
  );
};

KakaoMap.propTypes = {
  appKey: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

KakaoMap.defaultProps = {
  callback: undefined,
};

export default forwardRef(KakaoMap);
