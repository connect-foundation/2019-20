import React, { useContext } from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ActionBar from '../../components/action-bar';
import ToolBar from '../../components/action-bar/types/activity-layor';
import Category from './category';
import Price from './price';
import Field from './field';
import { filterContext } from '../../contexts/filters';

const useStyles = makeStyles({
  container: {
    padding: '2rem',
  },
});

export default () => {
  const TITLE = '관심 항목 설정';
  const classes = useStyles({});
  const filterConsumer = useContext(filterContext);
  const { TYPE, dispatch } = filterConsumer;

  const initailEvent = () => {
    dispatch({ type: TYPE.INITIAL });
  };

  return (
    <>
      <ActionBar
        contents={
          <ToolBar title={TITLE} />
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
          field={<Price />}
        />
        <Grid item>
          <Button variant="contained" onClick={initailEvent}>초기화 하기</Button>
        </Grid>
      </Grid>
    </>
  )
};
