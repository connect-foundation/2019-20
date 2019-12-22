import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from '@material-ui/core';

import Tabs from '../components/TapPage';
import ToolBar from '../components/ToolBar';

import { UserContext } from '../contexts/User';
import { PRODUCT } from '../assets/uris';

const getProducts = async (id, from) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${PRODUCT.PRODUCT_SELL_LIST_MEMBER}?from=${from}`,
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    return [];
  }
};

const CustomListItem = ({ title, id }) => (
  <ListItem divider button key={id}>
    {title}
  </ListItem>
);

const BuyList = () => {
  const { user } = useContext(UserContext);
  const [from] = useState(0);
  const [list, setList] = useState({ sell: [], finish: [], private: [] });

  useEffect(() => {
    const getProductsById = async () => {
      const data = await getProducts(user.id, from);
      setList((previousList) => {
        const newList = { ...previousList };
        data.forEach(({ _id, _source }) => {
          const cur = _source;
          cur.id = _id;
          switch (cur.currentStatus) {
            case '거래중':
            case '대기':
              newList.sell.push(cur);
              break;
            case '거래완료':
              newList.finish.push(cur);
              break;
            case '비공개':
              newList.private.push(cur);
              break;
            default: break;
          }
        });
        return newList;
      });
    };
    getProductsById();
  }, [from, user]);

  const makeNoDataMessage = (label) => `${label}인 게시글이 없습니다.`;
  const makeList = (item) => (<List>{item.map(CustomListItem)}</List>);
  const sellList = makeList(list.sell);
  const privateList = makeList(list.private);
  const finishList = makeList(list.finish);

  const category = [{
    label: '판매중',
    contents: (
      <>
        {list.sell.length === 0 && makeNoDataMessage`판매`}
        {list.sell.length > 0 && (<>{sellList}</>)}
      </>),
  },
  {
    label: '거래완료',
    contents: (
      <>
        {list.finish.length === 0 && makeNoDataMessage`거래완료`}
        {list.sell.length > 0 && (<>{finishList}</>)}
      </>
    ),
  },
  {
    label: '숨김',
    contents: (
      <>
        {list.private.length === 0 && makeNoDataMessage`숨김`}
        {list.sell.length > 0 && (<>{privateList}</>)}
      </>
    ),
  }];
  return (
    <>
      <ToolBar title='판매내역' />
      <Tabs items={category} />
    </>
  )
};

CustomListItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default BuyList;
