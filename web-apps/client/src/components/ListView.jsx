/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { List, ListItem } from '@material-ui/core';

import ToolBar from './ToolBar';

import { UserContext } from '../contexts/User';
import { ROUTES } from '../assets/uris';

import useScrollDown from '../hooks/useScrollDown';
import { debounce } from '../utils';
import {isLoggedIn, isVisited} from '../utils/auth';

const Lists = ({ title, getProducts }) => {
  const LOAD_DELAY = 1000;
  const { user } = useContext(UserContext);
  const [from, setFrom] = useState(0);
  const [list, setList] = useState([]);

  const loadList = useCallback(debounce(async () => {
    if(!isLoggedIn(user)) {
      return;
    }
    const data = await getProducts(user.id, from);
    setList((state) => [...state, ...data]);
  }, LOAD_DELAY), [user]);

  useEffect(() => {
    loadList();
  }, [from, loadList]);
  useScrollDown(() => { setFrom(from + 10); });

  const makeNoDataMessage = `${title}이 없습니다.`;
  const makeListItem = useMemo(() => (({ _source, _id }) => (
    <ListItem divider button key={_id}>
      <Link to={`${ROUTES.PRODUCT}/${_id}`}>
        {_source.title}
      </Link>
    </ListItem>
  )), []);

  
  if(!(isLoggedIn(user) && isVisited(user))) {
    return '비정상적인 접근';
  }

  return (
    <>
      <ToolBar title={title} />
      {list.length === 0 && makeNoDataMessage}
      {list.length > 0 && (
        <><List style={({ width: '100%' })}>{list.map(makeListItem)}</List></>
      )}
    </>
  )
};

Lists.propTyeps = {
  title: PropTypes.string.isRequired,
  getProducts: PropTypes.func.isRequired,
};

export default Lists;
