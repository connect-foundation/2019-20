/* eslint-disable no-param-reassign */
const getCurrentAddressByCoordinates = (maps, lat, lng, kakao, callback) => {
  maps.geocoder.coord2RegionCode(lng, lat, (result, status) => {
    if (status !== kakao.maps.services.Status.OK) {
      return;
    }
    const name = result[0].address_name;
    callback({ lat, lng, name });
  });
};

/**
 * 지도를 조작했을 때 현재 주소 정보를 불러오는 이벤트
 * @description 지도를 움직일 때마다 현재 마커의 위치를 지도
 * 중심으로 이동하고, 조작 후 일정시간 동안 조작이 없다면 현재
 * 지도의 중심지의 주소와 좌표를 반환합니다.
 * @param {Number} SEARCH_DELAY SEARCH_DELAY 지도를 갱신하기 위한 대기(디바운싱)
 * @param {Object} kakao 카카오 API를 사용할 수 있는 객체
 * @param {Object} maps 현재 dom을 조작하기 위한 정보
 * @param {Object} maps.geocoder gecoder
 * @param {Object} maps.map map
 * @param {Object} maps.marker marker
 * @param {Object} maps.circle circle
 * @param {Object} maps.timer timer 디바운싱을 위함
 * @param {Function} cb 현재 위치정보를 전달받을 함수
 */
const centerChangedEvent = (SEARCH_DELAY, kakao, maps, cb) => {
  const center = maps.map.getCenter();
  const lat = center.getLat();
  const lng = center.getLng();

  // 마커 위치, 원 현재 지도 중심 위치로 재조정
  maps.marker.setPosition(center);
  maps.circle.setPosition(center);

  // 위치 검색
  clearTimeout(maps.timer);
  maps.timer = setTimeout(() => {
    getCurrentAddressByCoordinates(
      maps,
      lat,
      lng,
      kakao,
      cb)
  }, SEARCH_DELAY);
};

export default centerChangedEvent;