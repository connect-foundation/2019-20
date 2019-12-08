import React, { useState, useEffect } from 'react';
import { Grid, GridList, GridListTile } from '@material-ui/core';
import Checkbox from '../components/orange-checkbox';
import ActionBar from '../components/action-bar';
import ToolBar from '../components/action-bar/types/activity-layor';
import SlideUpSnackbar from '../components/snack-bar';
import { getCategoryList } from '../utils/fetch';

const MESSAGE = {
  addCategory: '추가됐습니다',
  removeCategory: '해제됐습니다',
  selectAtLeastOneCategory: '최소 1개 이상 선택되어 있어야 합니다.',
  loadError: '카테고리 정보를 불러 올 수 없습니다.',
};

const noticeAddCategory = { open: true, message: MESSAGE.addCategory };
const noticeRemoveCategory = { open: true, message: MESSAGE.removeCategory };
const noticeClose = { open: false, message: '' };

const isMoreThanOneBeenSelected = (checklist) => checklist.length > 0;
const getLabelByFormControlLabel =
  (element) => element.parentElement.parentElement.getAttribute('label');

const checkCategoryEvent = (selectedCategory, setSelectedCategory, setNotice) => (event) => {
  const { checked } = event.target;
  const label = getLabelByFormControlLabel(event.target);
  if (checked) {
    setSelectedCategory([...selectedCategory, label]);
    setNotice(noticeAddCategory);
  }
  if (!checked) {
    const updatedCategory = selectedCategory.filter((name) => name !== label);
    if (!isMoreThanOneBeenSelected(updatedCategory)) {
      alert(MESSAGE.selectAtLeastOneCategory);
      return;
    }
    setSelectedCategory(updatedCategory);
    setNotice(noticeRemoveCategory);
  }
};

const Category = () => {
  const CLOSEDURATION = 3000;
  const TITLE = '관심 카테고리 설정';
  const [category, setCategoryLabel] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [notice, setNotice] = useState(noticeClose);

  useEffect(() => {
    const getCategoryFromServer = async () => {
      try {
        const response = await getCategoryList();
        setCategoryLabel(response);
      } catch (err) {
        alert(MESSAGE.loadError);
      }
    };
    getCategoryFromServer();
  }, []);

  useEffect(() => {
    if (!notice.open) {
      return;
    }
    setTimeout(() => setNotice(noticeClose), CLOSEDURATION);
  }, [notice]);

  const clickCheckboxEvent =
    checkCategoryEvent(selectedCategory, setSelectedCategory, setNotice);

  const checkboxes = category.map((name) => {
    const checked = selectedCategory.includes(name);
    return (
      <GridListTile key={`${name}`}>
        <Checkbox
          label={name}
          checked={checked}
          onChange={clickCheckboxEvent}
        />
      </GridListTile>
    );
  });

  return (
    <>
      <ActionBar
        contents={
          <ToolBar title={TITLE} />
        }
      />
      <Grid
        container
        style={({ padding: '2rem' })}
        direction='column'
      >
        <Grid container direction='column' alignItems='center' spacing={1}>
          <Grid item style={({ textAlign: 'center' })}>
            홈 화면에서 보고 싶지 않은 카테고리는<br />체크를 해제하세요.
          </Grid>
          <Grid item style={({ color: '#97989a' })}>
            최소 1개 이상 선택되어 있어야 합니다.
          </Grid>
        </Grid>
        <Grid item>
          <GridList cellHeight='auto' spacing={1}>
            {checkboxes}
          </GridList>
        </Grid>
      </Grid>

      <SlideUpSnackbar bottom='4rem' open={notice.open} duration={500} message={notice.message} />
    </>
  )
};

export default Category;