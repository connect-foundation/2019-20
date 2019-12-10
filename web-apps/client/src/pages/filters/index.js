import React, { useRef, useContext, useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AppyLicon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import ActionBar from '../../components/action-bar';
import getButtons from '../../components/action-bar/get-buttons';
import ToolBar from '../../components/action-bar/types/activity-layor';
import Field from '../../components/field';
import InputForm from '../../components/two-number-input';

import Category from './category';

import { filterContext } from '../../contexts/filters';
import { SnackbarContext } from '../../contexts/snackbar';

const useStyles = makeStyles({
  container: {
    padding: '2rem',
  },
});

const isCorrectPriceRange = (start, end) =>
  !((end && start > end) || (start < 0));

const MESSAGE = {
  APPLY: '정상적으로 적용됐습니다.',
  INCORRECT_PRICE: '올바르지 않은 가격범위입니다.',
  INITIAL: '지역범위를 포함한 모든 항목이 초기화 됐습니다.',
};

export default () => {
  const TITLE = '관심 항목 설정';
  const classes = useStyles({});
  const priceRef = useRef(null);
  const { setNotice } = useContext(SnackbarContext);
  const {
    filter: { price },
    dispatch,
    TYPE,
  } = useContext(filterContext);

  const applyPriceRangeInput = (event) => {
    event.preventDefault();
    const prices = priceRef.current.get();
    const [start, end] = prices;
    if (!isCorrectPriceRange(start, end)) {
      setNotice(MESSAGE.INCORRECT_PRICE);
      return;
    }
    dispatch({ type: TYPE.PRICE, payload: { start, end } });
    setNotice(MESSAGE.APPLY);
  };

  const initialFilters = (event) => {
    event.preventDefault();
    dispatch({ type: TYPE.INITIAL });
    priceRef.current.clear();
    setNotice(MESSAGE.INITIAL);
  };

  const buttons = [
    getButtons('취소', null, <ClearIcon />, initialFilters),
    getButtons('적용', null, <AppyLicon />, applyPriceRangeInput),
  ];

  useEffect(() => {
    priceRef.current.set(price.start, price.end);
  }, [price]);

  return (
    <>
      <ActionBar
        contents={
          <ToolBar title={TITLE} buttons={buttons} />
        }
      />
      <Grid
        container
        direction='column'
        className={classes.container}
      >
        <Field
          description='홈 화면에서 보고 싶지 않은 카테고리는 체크를 해제하세요.'
          subscription='최소 1개 이상 선택되어 있어야 합니다.'
          field={<Category />}
        />
        <Field
          description='가격범위 설정'
          subscription='가격범위는 상단의 적용버튼을 눌러야만 적용됩니다.'
          field={(
            <InputForm
              holders={['0', '제한없음']}
              ref={priceRef}
            />
          )}
        />
      </Grid>
    </>
  )
};
