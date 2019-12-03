import React from 'react';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import convertIconButtons from '../convert-icon-button';
import DefaultToolbar from './default';

const ActivityLayorToolbar = ({ title, buttons = [], link = '/' }) => {
  const IconButtons = buttons.map(convertIconButtons);
  const BackButtons = (
    <Link to={link}>
      <IconButton aria-label='back'>
        <ArrowBackIcon />
      </IconButton>
    </Link>
  );
  return (
    <>
      <DefaultToolbar leftArea={BackButtons} title={title} buttons={IconButtons} />
    </>
  )
};

ActivityLayorToolbar.propTypes = {
  title: PropTypes.node.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.element),
  link: PropTypes.string,
};

ActivityLayorToolbar.defaultProps = {
  buttons: [],
  link: '/',
};

export default ActivityLayorToolbar;
