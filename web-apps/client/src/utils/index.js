import msg from '../assets/messages';

const isMobile = (userAgent) => {
  const mobileEnv = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  if (mobileEnv.test(userAgent)) {
    return true;
  }
  return false;
};
const getReputation = (reputation, numberOfRater) => {
  if (numberOfRater === 0) {
    return 5;
  }
  return reputation / numberOfRater;
};
const getDistanceFromCurrentLocation = async (location) => {
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
  Number.prototype.toRad = function() {
    return (this * Math.PI) / 180;
  };

  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1).toRad(); // Javascript functions in radians
  const dLon = (lon2 - lon1).toRad();
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1.toRad()) *
      Math.cos(lat2.toRad()) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

//[ref](https://stackoverflow.com/questions/13840516/how-to-find-my-distance-to-a-known-location-in-javascript)

export {isMobile, getReputation, getDistanceFromCurrentLocation};
