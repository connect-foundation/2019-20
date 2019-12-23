import React from 'react';
import PropTypes from 'prop-types';

import { IconButton } from '@material-ui/core';

const emptyFunction = () => { };

const Button = ({ icon, onClick, index, length }) => {
  let edge;
  if (index === 0) {
    edge = 'start';
  }
  if (length - 1 === index) {
    edge = 'end';
  }
  return (
    <IconButton
      edge={edge || false}
      onClick={onClick || emptyFunction}
    >
      {icon}
    </IconButton>
  )
};

Button.propTypes = {
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(null),
  ]),
  index: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
};

Button.defaultProps = {
  onClick: null,
};

export default Button;
