import React from 'react';
import {useHistory} from 'react-router-dom';
import {IconButton} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const GoBackButton = () => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <IconButton aria-label='back' onClick={goBack}>
      <ArrowBackIcon />
    </IconButton>
  );
};

export default GoBackButton;
