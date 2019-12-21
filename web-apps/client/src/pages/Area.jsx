import React, { useContext } from 'react';

import MapAdjust from '../components/MapAdjust';

import { filterContext } from '../contexts/Filters';
import { SnackbarContext } from '../contexts/SnackBar';

const MESSAGE = {
  CLEAR: '전체지역으로 초기화되었습니다.',
  SET: '정상적으로 설정되었습니다',
};

const AreaPage = () => {
  const TITLE = '검색 범위 설정';

  const { setNotice } = useContext(SnackbarContext);
  const { FILTER_TYPE, dispatchFilter, filter } = useContext(filterContext);

  const clearArea = () => {
    setNotice(MESSAGE.CLEAR);
    dispatchFilter({ type: FILTER_TYPE.DISTANCE, payload: 0 });
  };

  const applySettings = (event, coordinates, localname, distance) => {
    event.preventDefault();
    dispatchFilter({ type: FILTER_TYPE.DISTANCE, payload: distance });
    dispatchFilter({
      type: FILTER_TYPE.COORDINATE, payload: {
        coordinates, localname,
      }
    });
    setNotice(MESSAGE.SET);
  };

  return (
    <MapAdjust
      filter={filter}
      title={TITLE}
      clearArea={clearArea}
      applySettings={applySettings}
      arange
    />
  )
};

export default AreaPage;
