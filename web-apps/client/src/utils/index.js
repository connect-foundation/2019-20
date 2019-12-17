// 재너럴
import msg from '../assets/messages';

export const isEmptyArr = (arr) => Array.isArray(arr) && arr.length < 1;

// 시간 관련
export const isInSameDay = (baseDate, timestamp) =>
  new Date(baseDate).toDateString() === new Date(timestamp).toDateString();

export const setBaseDate = (timestamp) =>
  new Date(timestamp).setHours(0, 0, 0, 0);

export const getKoKRFormatFullDate = (timestamp) =>
  new Date(timestamp).toLocaleDateString('ko-KR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const getKoKRFormatDayOfWeek = (timestamp) =>
  new Date(timestamp).toLocaleDateString('ko-KR', {
    weekday: 'long',
  });

export const getISOCurrentDate = () => new Date().toISOString();

// 포매팅
export const formatChat = (rowChat = []) => {
  const result = [];
  rowChat.forEach((chat) => {
    const chatTime = new Date(chat.timestamp);
    const lastChat = result[result.length - 1];
    if (result.length < 1 || isInSameDay(lastChat.baseDate, chatTime)) {
      result.push({
        baseDate: chatTime.setHours(0, 0, 0, 0),
        messages: [chat],
      });
    } else {
      lastChat.messages.push(chat);
    }
  });
  return result;
};

export const isMobile = (userAgent) => {
  const mobileEnv = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  if (mobileEnv.test(userAgent)) {
    return true;
  }
  return false;
};
export const getReputation = (reputation, numberOfRater) => {
  if (numberOfRater === 0) {
    return 5;
  }
  return reputation / numberOfRater;
};

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (err) => {
        reject(err);
      },
    );
  });
};
function getDistance(lon1, lat1, lon2, lat2) {
  /** Converts numeric degrees to radians */
  const toRadian = (num) => {
    return (num * Math.PI) / 180;
  };

  const R = 6371; // Radius of the earth in km
  const dLat = toRadian(lat2 - lat1); // Javascript functions in radians
  const dLon = toRadian(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadian(lat1)) *
      Math.cos(toRadian(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}
// [ref](https://stackoverflow.com/questions/13840516/how-to-find-my-distance-to-a-known-location-in-javascript)

export const getDistanceFromCurrentLocation = async (location) => {
  if (location === null) {
    return '';
  }
  try {
    const {
      coords: {latitude, longitude},
    } = await getCurrentLocation();
    const distance = getDistance(
      longitude,
      latitude,
      location.lon,
      location.lat,
    );
    return distance.toFixed(2);
  } catch (e) {
    throw new Error(msg.GPSError);
  }
};
