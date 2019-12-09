import React, { useContext, useMemo, useRef, useEffect } from 'react';
import InputForm from '../../components/two-input-form';
import { filterContext } from '../../contexts/filters';
import { SnackbarContext } from '../../contexts/snackbar';

const MESSAGE = {
  applyPrice: '적용됐습니다.',
  inCorrectRange: '올바르지 않은 가격범위입니다.',
};

export default () => {
  const snackbarConsumer = useContext(SnackbarContext);
  const filterConsumer = useContext(filterContext);
  const inputStart = useRef(null);
  const inputEnd = useRef(null);
  const { setNotice } = snackbarConsumer;
  const { filter, dispatch, TYPE } = filterConsumer;

  useEffect(() => {
    const { price: { start, end } } = filter;
    if (start) {
      inputStart.current.value = start;
    }
    if (end) {
      inputEnd.current.value = end;
    }
  }, [filter]);

  const applyEvent = (event) => {
    event.preventDefault();
    const start = +(inputStart.current.value);
    const end = +(inputEnd.current.value);
    let correct = false;
    if (!end && start >= 0) {
      correct = true;
      dispatch({ type: TYPE.PRICE, payload: { start } });
    } else if (start >= 0 && start <= end) {
      correct = true;
      dispatch({ type: TYPE.PRICE, payload: { start, end } });
    }
    if (correct) {
      setNotice(MESSAGE.applyPrice);
    } else {
      setNotice(MESSAGE.inCorrectRange);
    }
  };

  const priceElement = useMemo(() => (
    <InputForm
      submitEvent={applyEvent}
      startHolder='0'
      endHolder='제한없음'
      inputStartRef={inputStart}
      inputEndRef={inputEnd}
    />
  ), [applyEvent]);

  return (
    <>
      {priceElement}
    </>
  )
};
