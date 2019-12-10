import React from 'react';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import DefaultToolbar from './default';

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
    <>
      <DefaultToolbar leftArea={BackButtons} title={title} buttons={buttons} />
    </>
  )
};

ActivityLayorToolbar.propTypes = {
  title: PropTypes.node.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object),
};

ActivityLayorToolbar.defaultProps = {
  buttons: [],
};

export default ActivityLayorToolbar;
