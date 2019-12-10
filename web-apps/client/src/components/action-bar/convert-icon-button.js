import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';

const isLastItem = (index, array) => array.length - 1 === index;
const isFirstItem = (index) => index === 0;
const emptyFunction = () => { };

const convertIconButtons = (button, index, buttons) => {
  let edge;
  if (isFirstItem(index)) {
    edge = 'start';
  }
  if (isLastItem(index, buttons)) {
    edge = 'end';
  }
  return (
    <Link to={button.href || ''} key={button.name}>
      <IconButton
        edge={edge || false}
        onClick={button.onClick || emptyFunction}
      >
        {button.icon}
      </IconButton>
    </Link>
  );
};

export default convertIconButtons;
