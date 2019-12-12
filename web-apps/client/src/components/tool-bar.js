import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';

import Actionbar from './action-bar';

const ActivityLayorToolbar = ({ title, buttons = [] }) => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  const BackButtons = (
    <IconButton aria-label='back' onClick={goBack}>
      <ArrowBackIcon />
    </IconButton>
  );
  return (
    <Actionbar leftArea={BackButtons} title={title} buttons={buttons} />
  )
};

ActivityLayorToolbar.propTypes = {
  title: PropTypes.node.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.node,
    onClick: PropTypes.func,
  })),
};

ActivityLayorToolbar.defaultProps = {
  buttons: [],
};

export default ActivityLayorToolbar;
