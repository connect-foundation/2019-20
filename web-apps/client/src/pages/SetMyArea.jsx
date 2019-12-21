import React, { useContext, useState } from 'react';

import { Redirect } from 'react-router-dom';

import { AlertMessageContext } from '../contexts/AlertMessage';
import { UserContext } from '../contexts/User';

import MapAdjust from '../components/MapAdjust';

import msg from '../assets/errorMessages'
import { addUser } from '../utils/apiCall';
import { ROUTES } from '../assets/uris';

const AreaPage = () => {
  const TITLE = '우리 동네 등록';

  const { setUser } = useContext(UserContext);
  const { dispatchMessage, ACTION_TYPE } = useContext(AlertMessageContext);
  const [enroll, setEnroll] = useState(false);

  const enrollLocation = async (event, coordinates) => {
    const [latitude, longitude] = coordinates.split(',');
    try {
      const user = await addUser({ latitude, longitude });
      setUser(user);
      setEnroll(true);
    } catch (err) {
      if (err.message === 400) {
        dispatchMessage({ action: ACTION_TYPE.ERROR, payload: msg.alreadySignedUpMemberError });
      } else if (err.message === 500) {
        dispatchMessage({ action: ACTION_TYPE.ERROR, payload: msg.serverError });
      }
    }
  };

  if (enroll) {
    return <Redirect to={ROUTES.MAIN} />
  }

  return (
    <MapAdjust
      title={TITLE}
      applySettings={enrollLocation}
      message='동네를 등록해야 회원가입이 완료됩니다.'
    />
  );
};

export default AreaPage;
