import axios from 'axios';
import Inko from 'inko';
import React, { useRef, useState, useEffect, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Input from '../components/search';
import ToolBar from '../components/tool-bar';

import { filterContext } from '../contexts/filters';

const useStyles = makeStyles({
  'root': {
    width: '100%',
    '& h6': {
      width: '100%',
    },
  }
});

const getKeywordList = async (keyword) => {
  const response = await axios.get('http://localhost:5000/info/keyword', {
    params: { keyword }
  })
  return response.data;
}

const isEnglishOnly = (keyword) => !(/[가-힣]/.test(keyword));
const isKoreanOnly = (keyword) => !(/[a-zA-Z]/.test(keyword));

export default () => {
  const SEARCH_DELAY = 500;
  const classes = useStyles({});
  const inputRef = useRef({ current: '' });
  const { filter: { keyword }, dispatch, TYPE } = useContext(filterContext);
  const [list, setList] = useState([]);
  const [recommend, setRecommned] = useState('');
  const timer = { current: '' };
  const histroy = useHistory();

  useEffect(() => {
    if (keyword.length) {
      inputRef.current.set(keyword);
    }
  }, []);

  const inputKeyword = () => {
    const keyword = inputRef.current.get();
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(async () => {
      const data = await getKeywordList(keyword);
      const list = data.map(({ _source: { word } }) => word);
      setList(list);
    }, SEARCH_DELAY);
  }

  useEffect(() => {
    const keyword = inputRef.current.get();
    let recommendKeyword = '';
    if (list.length >= 1 || keyword.length <= 1) {
      setRecommned('');
      return;
    }
    if (isEnglishOnly(keyword)) {
      recommendKeyword = new Inko().en2ko(keyword);
    }
    if (isKoreanOnly(keyword)) {
      recommendKeyword = new Inko().ko2en(keyword);
    }
    if (recommendKeyword.length > 1) {
      setRecommned(recommendKeyword);
    };
  }, [list]);

  const onTransferKeyword = () => {
    inputRef.current.set(recommend);
    inputKeyword();
  };

  const updateKeyword = (event) => {
    const name = event.target.innerText;
    dispatch({ type: TYPE.KEYWORD, payload: name });
    histroy.goBack();
  };

  const enterEvent = (event) => {
    if (event.key !== 'Enter') {
      return;
    }
    const name = inputRef.current.get();
    dispatch({ type: TYPE.KEYWORD, payload: name });
    histroy.goBack();
  }

  return (
    <>
      <div className={classes.root}>
        <ToolBar title={<Input ref={inputRef} onChange={inputKeyword} onKeyDown={enterEvent} />} />
      </div>
      <List className={classes.root}>
        {recommend.length > 0 &&
          (<ListItem onClick={onTransferKeyword}>{recommend}를 입력하려 하셨나요?</ListItem>)
        }
        {list.map((name) => (
          <ListItem onClick={updateKeyword} divider button key={name}>{name}</ListItem>
        ))}
      </List>
    </>
  );
};
