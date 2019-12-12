// 재너럴
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
