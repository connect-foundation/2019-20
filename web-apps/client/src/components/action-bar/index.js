import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar } from '@material-ui/core';
import useStyle from './style';

/**
 * ActionBar 생성
 * @description Usage : types 폴더 안의 element중 하나를 사용하여
 * 하나의 ActionBar를 생성합니다.
 * activity-layor-toolbar : 뒤로 가기 버튼이 있는 ToolBar
 * @param {Object} contents ./types 중의 element
 */
const ActionBar = ({ contents }) => {
  const classes = useStyle({});
  return (
    <AppBar position='sticky' color='inherit'>
      <Toolbar className={classes.toolbar}>
        {contents}
      </Toolbar>
    </AppBar>
  );
}

ActionBar.propTypes = {
  contents: PropTypes.element.isRequired,
};

export default ActionBar;
