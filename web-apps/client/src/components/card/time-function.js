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

export const takeDigitFromNumber = (money) => {
  const digit = money.toString().split('').reverse();
  const result = digit.map((number, i, arr) => {
    if ((i + 1) % 3 === 0 && i + 1 !== arr.length) {
      return `,${number}`;
    }
    return number;
  })
    .reverse()
    .join('');
  return result;
};
