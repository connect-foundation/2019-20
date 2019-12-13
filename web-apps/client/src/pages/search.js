import axios from 'axios';
import Inko from 'inko';
import React, { useRef, useState, useEffect } from 'react';

import { List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Test from '../components/search';
import ToolBar from '../components/tool-bar';

const useStyles = makeStyles({
  'root': {
    width: '100%',
    '& h6': {
      width: '100%',
    },
  }
});

const getKeywordList = async (keyword) => {
  const response = await axios.get('http://localhost:5000/products', {
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
  const [list, setList] = useState([]);
  const [recommend, setRecommned] = useState('');
  const timer = { current: '' };

  const inputKeyword = () => {
    const keyword = inputRef.current.get();
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(async () => {
      const data = await getKeywordList(keyword, 0);
      setList(data);
    }, SEARCH_DELAY);
  }

  useEffect(() => {
    const keyword = inputRef.current.get();
    let recommendKeyword = '';
    if (list.length > 1 || keyword.length <= 1) {
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

  const view = list.map(({ _id, _source: { title } }) => (
    <ListItem divider button key={_id}>{title}</ListItem>
  ));

  return (
    <>
      <div className={classes.root}>
        <ToolBar title={<Test ref={inputRef} onChange={inputKeyword} />} />
      </div>
      <List>
        {recommend.length > 0 &&
          (<ListItem onClick={onTransferKeyword}>{recommend}를 입력하려 하셨나요?</ListItem>)
        }
        {view}
      </List>
    </>
  );
};
