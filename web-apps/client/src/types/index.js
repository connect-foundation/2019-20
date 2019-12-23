import {
  shape,
  string,
  number,
  oneOfType,
  func,
  instanceOf,
  arrayOf,
  node,
} from 'prop-types';

export const imageShape = shape({
  mobile: string,
  deskTop: string,
});

export const productShape = shape({
  _id: string,
  title: string,
  pictures: arrayOf(imageShape),
});

/**
 * user의 정보 형태
 */
export const userShape = shape({
  id: string,
  name: string,
  email: string,
  authority: string,
  latitude: number,
  longitude: number,
  reputation: number,
  numberOfRater: number,
});

/**
 * chat message의 형태
 */
export const messageShape = shape({
  timestamp: string,
  content: string,
  userId: string,
});

/**
 * chat message를 기준 날짜에 맞춰 나눈 형태
 */
export const messagesByDateShape = shape({
  baseDate: number,
  messaages: arrayOf(messageShape),
});

/**
 * chat room list(채팅방 목록) 에 사용되는 데이터 형태
 */
export const chatRoomListType = arrayOf(
  shape({
    messages: arrayOf(messageShape),
    seller: userShape,
    buyer: userShape,
  }),
);

export const socketType = shape({
  current: shape({
    emit: func,
    once: func,
  }),
});

/**
 * react의 prop중 children 의 형태
 */
export const childrenType = oneOfType([arrayOf(node), node]).isRequired;

/**
 * react의 ref에 대한 형태
 * 참고: https://stackoverflow.com/a/51127130/5755608
 */
export const refType = oneOfType([func, shape({current: instanceOf(Element)})]);
