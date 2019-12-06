import {oneOfType, arrayOf, node} from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const childrenType = oneOfType([arrayOf(node), node]).isRequired;
