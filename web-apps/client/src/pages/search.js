import axios from 'axios';
import React, { useRef, useState } from 'react';

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

export default () => {
  const SEARCH_DELAY = 500;
  const classes = useStyles({});
  const inputRef = useRef({ current: '' });
  const [list, setList] = useState([]);
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

  const view = list.map(({ _id, _source: { _title } }) => <li key={_id}>{_title}</li>);

  return (
    <>
      <div className={classes.root}>
        <ToolBar title={<Test ref={inputRef} onChange={inputKeyword} />} />
      </div>
      <ul>
        {view}
      </ul>
    </>
  );
};
