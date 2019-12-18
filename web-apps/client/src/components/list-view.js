/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from '@material-ui/core';

import ToolBar from './tool-bar';

import { UserContext } from '../contexts/user';

const Lists = ({ title, getProducts }) => {
  const { user } = useContext(UserContext);
  const [from] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => {
    const getProductsById = async () => {
      const data = await getProducts(user, from);
      setList([...list, ...data]);
    };
    getProductsById();
  }, [from, getProducts, list, user]);

  const makeNoDataMessage = `${title}이 없습니다.`;
  const makeListItem = ({ _source, _id }) => (
    <ListItem divider button key={_id}>
      {_source.title}
    </ListItem>
  );

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