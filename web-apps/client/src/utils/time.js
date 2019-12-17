export const calculateHourMinuteAndSeconds = (writeDate, currentDate) => {
  const interval = currentDate - writeDate;
  const seconds = Math.floor(interval / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const day = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds}초 전`;
  }
  if (minutes < 60) {
    return `${minutes}분 전`;
  }
  if (hours < 24) {
    return `${hours}시간 전`;
  }
  return `${day}일 전`;
};

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export const takeDigitFromNumber = (money) => {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
