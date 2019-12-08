import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import loadAPIScript from './load-api-script';
import TYPE from './type';

const KakaoMap = ({
  appKey,
  width,
  height,
  latitude,
  longitude,
  keyword,
  callback
}) => {
  const [scriptLoading, setScriptLoading] = useState(false);
  const [functions, setFunction] = useState(null);
  const [timer, setTimer] = useState(null);
  const kakaoMapArea = useRef(null);
  const SEARCHDELAY = 500;

  const actions = (containerRef) => () => {
    // @ts-ignore
    const { kakao } = window;

    kakao.maps.load(() => {
      setScriptLoading(true);
      let marker;
      let getAddressTimer;
      const geocoder = new kakao.maps.services.Geocoder();
      const container = containerRef.current;
      const position = new kakao.maps.LatLng(33.450701, 126.570667);
      const map = new kakao.maps.Map(container, { center: position, level: 3 });
      map.setDraggable(true);

      kakao.maps.event.addListener(map, 'center_changed', () => {
        const center = map.getCenter();
        const lat = center.getLat();
        const lng = center.getLng();
        if (marker) {
          marker.setMap(null);
        }
        marker = new kakao.maps.Marker({ position: center });
        marker.setMap(map);
        if (getAddressTimer) {
          clearTimeout(getAddressTimer);
        }
        const getAddressByMapMove = () => {
          geocoder.coord2RegionCode(lng, lat, (result, status) => {
            if (status !== kakao.maps.services.Status.OK) {
              return;
            }
            if (callback) {
              callback(TYPE.COORDINATE, {
                lat,
                lng,
                name: result[0].address_name,
                depth3: result[0].region_3depth_name,
              });
            }
          });
        }
        getAddressTimer = setTimeout(getAddressByMapMove, SEARCHDELAY);
      });

      const findCoordsByAddress = (address) => {
        geocoder.addressSearch(address, (result) => {
          callback(TYPE.ADDRESS, result);
        });
      };
      const findAddressByCoords = (lat, lng) => {
        geocoder.coord2RegionCode(lng, lat, (result, status) => {
          if (status !== kakao.maps.services.Status.OK) {
            return;
          }
          map.setCenter(new kakao.maps.LatLng(lat, lng));
        });
      }
      setFunction({
        findCoordsByAddress,
        findAddressByCoords
      })
    });
  }

  useEffect(loadAPIScript(appKey, actions(kakaoMapArea)), []);

  const processQuarterlyLocation = () => {
    if (!functions) {
      return;
    }
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    const newTimer = setTimeout(() => {
      if (keyword.length) {
        functions.findCoordsByAddress(keyword);
      } else if (latitude && longitude) {
        functions.findAddressByCoords(latitude, longitude);
      }
    }, SEARCHDELAY);
    setTimer(newTimer);
  };
  useEffect(processQuarterlyLocation, [keyword, latitude, longitude]);

  if (!scriptLoading) {
    return <><CircularProgress /></>;
  }

  return (
    <>
      <div ref={kakaoMapArea} style={({ width, height })}>&nbsp;</div>
    </>
  );
};

KakaoMap.propTypes = {
  appKey: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  callback: PropTypes.func,
};

KakaoMap.defaultProps = {
  callback: undefined,
};

export default KakaoMap;