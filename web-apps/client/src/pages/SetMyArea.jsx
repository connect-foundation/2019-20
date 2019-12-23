import React, {useCallback, useContext, useState} from 'react';

import {Link} from 'react-router-dom';

import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {AlertMessageContext} from '../contexts/AlertMessage';
import {UserContext} from '../contexts/User';

import MapAdjust from '../components/MapAdjust';

import msg from '../assets/errorMessages';
import {addUser} from '../utils/apiCall';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    position: 'absolute',
    right: '1.5rem',
  },
  confirmButton: {
    background: '#1db000',
    color: 'white',
  },
});

const AreaPage = () => {
  const TITLE = '우리 동네 등록';

  const classes = useStyles({});

  const {dispatchUser, USER_ACTION_TYPE} = useContext(UserContext);
  const {dispatchMessage, ALERT_ACTION_TYPE} = useContext(AlertMessageContext);
  const [coordinates, setCoordinates] = useState({});

  const listenFromMapAdjust = useCallback((latitude, longitude) => {
    setCoordinates({latitude, longitude});
  }, []);

  const enrollLocation = async () => {
    if (!Object.keys(coordinates).length) {
      dispatchMessage({
        action: ALERT_ACTION_TYPE.ERROR,
        payload: msg.pleaseWaitForUpdatingCoordinate,
      });
      return;
    }
    try {
      const user = await addUser(coordinates);
      dispatchUser({type: USER_ACTION_TYPE.LOG_IN, payload: user});
    } catch (err) {
      if (err.message === 400) {
        dispatchMessage({
          action: ALERT_ACTION_TYPE.ERROR,
          payload: msg.alreadySignedUpMemberError,
        });
      } else if (err.message === 500) {
        dispatchMessage({
          action: ALERT_ACTION_TYPE.ERROR,
          payload: msg.serverError,
        });
      }
    }
  };

  return (
    <>
      <MapAdjust
        title={TITLE}
        listenCoordinates={listenFromMapAdjust}
        message='동네를 등록해야 회원가입이 완료됩니다.'
      />
      <Link to='/service/main' className={classes.link}>
        <Button
          className={classes.confirmButton}
          variant='contained'
          onClick={enrollLocation}
        >
          확인
        </Button>
      </Link>
    </>
  );
};

export default AreaPage;
