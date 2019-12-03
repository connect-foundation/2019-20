import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';

const convertIconButtons = (button, currentIndex, buttons) => {
  const { length } = buttons;
  let edge = false;
  if (currentIndex === 0) {
    edge = 'start';
  }
  if (currentIndex === length - 1) {
    edge = 'end';
  }
  return (
    <Link to={button.href} key={button.name}>
      <IconButton
        edge={edge}
      >
        {button.icon}
      </IconButton>
    </Link>
  );
};

export default convertIconButtons;
