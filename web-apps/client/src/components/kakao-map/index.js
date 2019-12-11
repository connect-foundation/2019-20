import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle
} from 'react';
import PropTypes from 'prop-types';

import { CircularProgress, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GpsIcon from '@material-ui/icons/GpsFixed';

import loadAPIScript from './load-api-script';
import centerChangedEvent from './move-map-event';

const useStyles = makeStyles({
  currentButton: {
    position: 'absolute',
    zIndex: 10,
    right: 0,
    top: 0,
  }
});

let circle;
const KakaoMap = ({ appKey, width, height, callback }, ref) => {
  const DEFAULT_COORDINATES = [33.26286737438862, 126.61765385186918];
  const SEARCH_DELAY = 1000;
  const [scriptLoading, setScriptLoading] = useState(false);
  const [api, setApi] = useState({ geocoder: null, map: null, kakao: null });
  const section = useRef(null);

  const classes = useStyles({});

  useImperativeHandle(ref, () => ({
    searchAddress: (address) => {
      const { geocoder } = api;
      return new Promise((resolve) => {
        geocoder.addressSearch(address, (result) => {
          resolve(result);
        });
      });
    },
    adjustRadius: (distance) => {
      const { map, kakao } = api;
      if (circle) {
        circle.setMap(null);
      }
      circle = new kakao.maps.Circle({
        center: map.getCenter(),
        radius: distance * 1000,
        fillColor: '#000000',
        fillOpacity: 0.5,
      });
      circle.setMap(map);
    },
    setCenterCoordinates: (lat, lng) => {
      const { geocoder, map, kakao } = api;
      geocoder.coord2RegionCode(lng, lat, (result, status) => {
        if (status !== kakao.maps.services.Status.OK) {
          return;
        }
        map.setCenter(new kakao.maps.LatLng(lat, lng));
      });
    },
  }));

  const setCurrentCoordinates = () => {
    navigator.geolocation.getCurrentPosition((point) => {
      const { coords: { latitude, longitude } } = point;
      ref.current.setCenterCoordinates(latitude, longitude);
    });
  };

  const initialKakaoMap = (containerRef) => () => {
    const { kakao } = window;

    kakao.maps.load(() => {
      setScriptLoading(true);
      const geocoder = new kakao.maps.services.Geocoder();
      const container = containerRef.current;
      const position = new kakao.maps.LatLng(...DEFAULT_COORDINATES);
      const map = new kakao.maps.Map(container, { center: position, level: 10 });
      map.setDraggable(true);
      setApi(() => ({ geocoder, map, kakao }));

      const maps = {
        geocoder,
        callback,
        map,
      };

      kakao.maps.event.addListener(map,
        'center_changed',
        centerChangedEvent.bind(this, SEARCH_DELAY, kakao, maps, callback)
      );
      kakao.maps.event.addListener(map,
        'center_changed',
        () => {
          if (circle) {
            circle.setPosition(map.getCenter());
          }
        }
      );
    });
  };

  useEffect(loadAPIScript(appKey, initialKakaoMap(section)), []);

  if (!scriptLoading) {
    return <><CircularProgress /></>;
  }

  return (
    <div style={({ position: 'relative' })}>
      <IconButton
        onClick={setCurrentCoordinates}
        className={classes.currentButton}
      >
        <GpsIcon />
      </IconButton>
      <div ref={section} style={({ width, height })}>
        <></>
      </div>
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
  callback: () => { },
};

export default forwardRef(KakaoMap);