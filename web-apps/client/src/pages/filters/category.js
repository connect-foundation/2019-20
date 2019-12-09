import React, { useContext, useMemo } from 'react';
import { GridList, GridListTile } from '@material-ui/core';
import Checkbox from '../../components/orange-checkbox';
import { filterContext } from '../../contexts/filters';
import { SnackbarContext } from '../../contexts/snackbar';

const MESSAGE = {
  addCategory: '추가됐습니다',
  removeCategory: '해제됐습니다',
  selectAtLeastOneCategory: '최소한 1개 이상의 카테고리가 선택되어야 합니다.',
};

const getLabelByFormControlLabel = (element) => element.lastElementChild.textContent;

const Category = () => {
  const filterConsumer = useContext(filterContext);
  const { setNotice } = useContext(SnackbarContext);
  const { filter: { categories, CATEGORYLABEL } } = filterConsumer;
  const { dispatch, TYPE } = filterConsumer;

  const changeCategoryListEvent = (event) => {
    event.preventDefault();
    const label = getLabelByFormControlLabel(event.currentTarget);
    const { target: { checked } } = event;
    if (checked) {
      dispatch({ type: TYPE.CATEGORYADD, payload: label });
      setNotice(MESSAGE.addCategory);
    }
    if (!checked) {
      if (categories.length <= 1) {
        setNotice(MESSAGE.selectAtLeastOneCategory);
      } else {
        dispatch({ type: TYPE.CATEGORYREMOVE, payload: label });
        setNotice(MESSAGE.removeCategory);
      }
    }
  }

  const categoryListElement = useMemo(() => CATEGORYLABEL.map((name) => {
    const checked = categories.includes(name);
    return (
      <GridListTile key={name}>
        <Checkbox
          checked={checked}
          label={name}
          onChange={changeCategoryListEvent}
        />
      </GridListTile>
    );
  }), [CATEGORYLABEL, categories, changeCategoryListEvent]);

  return (
    <GridList cellHeight='auto' spacing={1}>
      {categoryListElement}
    </GridList>
  );
};

export default Category;