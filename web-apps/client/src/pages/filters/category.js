import React, { useContext } from 'react';

import { GridList, GridListTile } from '@material-ui/core';

import Checkbox from '../../components/checkbox-label';
import { filterContext } from '../../contexts/filters';
import { SnackbarContext } from '../../contexts/snackbar';

const MESSAGE = {
  ADD: '추가됐습니다',
  REMOVE: '해제됐습니다',
  SELECT_LEAST_ONE: '최소한 1개 이상의 카테고리가 선택되어야 합니다.',
};

const Category = () => {
  const { setNotice } = useContext(SnackbarContext);
  const {
    filter: { categories, CATEGORYLABEL },
    dispatch,
    TYPE,
  } = useContext(filterContext);

  const addCategory = (label) => {
    dispatch({ type: TYPE.CATEGORY_ADD, payload: label });
    setNotice(MESSAGE.ADD);
  };

  const removeCategory = (label) => {
    if (categories.length <= 1) {
      setNotice(MESSAGE.SELECT_LEAST_ONE);
    } else {
      dispatch({ type: TYPE.CATEGORY_REMOVE, payload: label });
      setNotice(MESSAGE.REMOVE);
    }
  };

  const changeCategoryListEvent = (event, checked, label) => {
    if (checked) {
      addCategory(label);
    }
    if (!checked) {
      removeCategory(label);
    }
  };

  return (
    <GridList cellHeight='auto' spacing={1}>
      {(
        CATEGORYLABEL.map((name) => (
          <GridListTile key={name}>
            <Checkbox
              checked={categories.includes(name)}
              label={name}
              onChange={changeCategoryListEvent}
            />
          </GridListTile>
        ))
      )}
    </GridList>
  );
};

export default Category;