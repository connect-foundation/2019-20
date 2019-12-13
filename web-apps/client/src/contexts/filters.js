import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCategoryList } from '../pages/main/fetch';

const filterInfo = {
  price: {
    start: 0,
    end: 0,
  },
  categories: [],
  coordinates: '',
  distance: 0,
  localname: '전체',
  CATEGORYLABEL: [],
  keyword: '',
};

const TYPE = {
  INITIAL: 0,
  CATEGORY_INITIAL: 1,
  PRICE: 2,
  CATEGORY_ADD: 3,
  CATEGORY_REMOVE: 4,
  LOCAL_NAME: 5,
  COORDINATE: 6,
  DISTANCE: 7,
  KEYWORD: 8,
};

const filterReducer = (state, { type, payload }) => {
  switch (type) {

    case TYPE.INITIAL:
      return JSON.parse(JSON.stringify(filterInfo));

    case TYPE.PRICE:
      return { ...state, price: { ...payload } };

    case TYPE.CATEGORY_ADD:
      return { ...state, categories: [...state.categories, payload] };

    case TYPE.CATEGORY_REMOVE: {
      const updatedCategory =
        state.categories.filter((name) => name !== payload);
      return { ...state, categories: updatedCategory };
    }

    case TYPE.COORDINATE: {
      const { coordinates, localname } = payload;
      const distance = state.distance || 1;
      return { ...state, coordinates, localname, distance };
    }

    case TYPE.CATEGORY_INITIAL:
      filterInfo.CATEGORYLABEL = payload;
      filterInfo.categories = payload;
      return { ...state, categories: payload, CATEGORYLABEL: payload };

    case TYPE.DISTANCE:
      if (+payload === 0) {
        return { ...state, distance: +payload, localname: '전체' }
      }
      return { ...state, distance: +payload };

    case TYPE.KEYWORD:
      return { ...state, keyword: payload };

    default:
      return state;
  }
};

export const filterContext = createContext({});

export const FilterProvider = ({ children }) => {
  const [filter, dispatch] = useReducer(filterReducer, filterInfo);
  useEffect(() => {
    const getCategoryFromServer = async () => {
      try {
        const list = await getCategoryList();
        dispatch({ type: TYPE.CATEGORY_INITIAL, payload: list });
      } catch (err) {
        alert('카테고리 정보를 불러 올 수 없습니다.');
      }
    };
    getCategoryFromServer();
  }, []);
  return (
    <filterContext.Provider value={{ TYPE, filter, dispatch }}>
      {children}
    </filterContext.Provider>
  );
};

// https://stackoverflow.com/questions/42122522/reactjs-what-should-the-proptypes-be-for-this-props-children
FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
