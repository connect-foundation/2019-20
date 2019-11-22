import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {size} from '../styles';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  padding: 0 ${size.xl};
`;

export default function Container({children}) {
  return <Wrapper>{children}</Wrapper>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
