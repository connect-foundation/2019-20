import React, { useState, useEffect } from 'react';
import { Grid, GridList, GridListTile } from '@material-ui/core';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Checkbox from '../components/orange-checkbox';
import ActionBar from '../components/action-bar';
import ToolBar from '../components/action-bar/types/activity-layor';
import SlideUpSnackbar from '../components/snack-bar';
import CATEGORYLABELS from '../utils/fetch';
import MESSAGE from './messages';
import PAGETITLE from './page-title';

const noticeAddCategory = { open: true, message: MESSAGE.addCategory };
const noticeRemoveCategory = { open: true, message: MESSAGE.removeCategory };
const noticeClose = { open: false, message: '' };

const checkInvalidCategory = (name) => CATEGORYLABELS.includes(name);
const isEmpty = (object) => Object.keys(object).length === 0;
const isMoreThanOneBeenSelected = (checklist) => checklist.length > 0;
const getLabelByFormControlLabel =
  (element) => element.parentElement.parentElement.getAttribute('label');


const Category = ({ location }) => {
  const CLOSEDURATION = 3000;
  const TITLE = PAGETITLE.category;

  const query = queryString.parse(location.search);
  const receivedCategory =
    (isEmpty(query)) ? [...CATEGORYLABELS] : query.category.split(',');

  const initialCategorySetted = receivedCategory.filter(checkInvalidCategory);
  const [category, setCategory] = useState(initialCategorySetted);

  const mainLink =
    (category.length > 0) ? `/?category=${category.join(',')}` : '/';

  const [notice, setNotice] = useState(noticeClose);
  useEffect(() => {
    if (!notice.open) {
      return;
    }
    setTimeout(() => setNotice(noticeClose), CLOSEDURATION);
  }, [notice]);

  const checkCategoryEvent = (event) => {
    const { checked } = event.target;
    const label = getLabelByFormControlLabel(event.target);
    if (checked) {
      setCategory([...category, label]);
      setNotice(noticeAddCategory);
    }
    if (!checked) {
      const updatedCategory = category.filter((name) => name !== label);
      if (!isMoreThanOneBeenSelected(updatedCategory)) {
        alert(MESSAGE.selectAtLeastOneCategory);
        return;
      }
      setCategory(updatedCategory);
      setNotice(noticeRemoveCategory);
    }
  };

  const checkboxes = CATEGORYLABELS.map((name) => {
    const checked = category.includes(name);
    return (
      <GridListTile key={`${name}${checked}`}>
        <Checkbox
          label={name}
          checked={checked}
          onChange={checkCategoryEvent}
        />
      </GridListTile>
    );
  });

  return (
    <>
      <ActionBar
        contents={
          <ToolBar link={mainLink} title={TITLE} />
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
          <GridList cellHeight='auto' spacing={1} direction='column'>
            {checkboxes}
          </GridList>
        </Grid>
      </Grid>

      <SlideUpSnackbar open={notice.open} duration={500} message={notice.message} />
    </>
  )
};

Category.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Category;