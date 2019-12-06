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

// 유저 정보가 변하면, 수정되어야 함
export const uIdType = oneOfType([string, number]);

export const messageShape = shape({
  timestamp: string,
  content: string,
  userId: uIdType,
});

export const messagesByDateShape = shape({
  baseDate: number,
  messaages: arrayOf(messageShape),
});

// 참고: https://stackoverflow.com/a/51127130/5755608
export const refType = oneOfType([func, shape({current: instanceOf(Element)})]);

export const socketType = shape({
  current: shape({
    emit: func,
    once: func,
  }),
});

export const childrenType = oneOfType([arrayOf(node), node]).isRequired;
