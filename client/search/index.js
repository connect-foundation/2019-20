import React, { useState, useEffect } from 'react';
import Header from './app-bar';
import SimpleList from '../../components/simple-list';
import Search from '../../components/simple-search';
import request from '../../utils/request';
import useContainerStyle from './style';
import convertESResultToSimpleList from './es-result-converter';

/**
 * 서버로부터 특정 키워드를 입력받아 state를 변경하는 함수입니다.
 * useEffect내에서 처리하려고 하였으나 eslint dependency 경고메시지로 
 * 별도의 함수로 빼두었고, setState는 콜백함수를 전달하여 처리하도록 하였습니다.
 * @param {*} keyword 검색어
 * @param {*} from elastic search의 from (시작 점)
 * @param {*} size elastic search의 size (가져올 데이터의 수)
 * @param {*} setList callback 함수, useState의 setState
 * @param {*} list useState의 state
 */
const getDataFromServer = async (keyword, from, size, setList, list = []) => {
  const response = await request(keyword, from, size);
  const listConverted = response.data.map(convertESResultToSimpleList);
  if (from > 0 && listConverted.length > 0) {
    setList([...list, ...listConverted])
  } else {
    setList(listConverted);
  }
};

/**
 * 스크롤이 하단으로 이동했을 때, 해당 콜백을 실행하는 메소드 입니다.
 * @param {}} cb 
 */
const scrollBottomDetectionEvent = (cb) => {
  const bottom = (window.innerHeight + window.scrollY >= document.body.offsetHeight);
  if (bottom) {
    cb();
  }
};

export default () => {
  const [list, setList] = useState([]); // 검새결과를 담을 state
  const [from, setFrom] = useState(0);  // 페이지네이션을 위한 state
  const [keyword, setKeyword] = useState(null); // 검색결과를 담을 state
  const [loading, setLoading] = useState(false); // 검색결과를 받아오는동안 재요청을 방지하기 위한 state
  const pageSize = 10;  // 한 페이지에 보여질 리스트의 수
  const classes = useContainerStyle({ bgColor: '#d8d8d8' });

  const getListByKeyword = (event, inputRef) => {
    event.preventDefault();
    const inputValue = inputRef.current.value;
    setKeyword(inputValue);
    setFrom(0);
  };

  const updatePage = () => {
    setLoading(true);
    getDataFromServer(keyword, from, pageSize, setList, list)
    setLoading(false);
  }

  const addTurnPageEvent = () => {
    const nextPage = () => {
      if (loading) {
        return;
      }
      setFrom((page) => page + 1);
    };
    const event = scrollBottomDetectionEvent.bind(this, nextPage);
    window.addEventListener('wheel', event);
    window.addEventListener('touchmove', event);
  }

  useEffect(updatePage, [from, keyword]);
  useEffect(addTurnPageEvent, []);

  return (
    <>
      <Header title='제품명 검색' />
      <div className={classes.search}>
        <Search bgColor='white' submitEvent={getListByKeyword} onChangeEvent={getListByKeyword} />
      </div>
      <div className={classes.contents}>
        <SimpleList contents={list} />
      </div>
    </>
  );
};
