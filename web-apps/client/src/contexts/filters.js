import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCategoryList } from '../utils/fetch';

const filterInfo = {
  price: {
    start: 0,
    end: 0,
  },
  categories: [],
  coordinates: '',
  distance: 0,
  CATEGORYLABEL: [],
};

const TYPE = {
  INITIAL: 0,
  CATEGORYINITIAL: 1,
  PRICE: 2,
  CATEGORYADD: 3,
  CATEGORYREMOVE: 4,
  AREA: 5,
  AREARANGE: 6,
};

const filterReducer = (state, { type, payload }) => {
  switch (type) {
    case TYPE.INITIAL:
      return JSON.parse(JSON.stringify(filterInfo));
    case TYPE.PRICE:
      return { ...state, price: { ...payload } };
    case TYPE.CATEGORYADD:
      return { ...state, categories: [...state.categories, payload] };
    case TYPE.CATEGORYREMOVE: {
      if (state.categories.length <= 1) {
        return state;
      }
      const updatedCategory = state.categories.filter((name) => name !== payload);
      return { ...state, categories: updatedCategory };
    }
    case TYPE.AREA:
      return { ...state, area: payload };
    case TYPE.AREARANGE:
      return { ...state, areaRange: +payload };
    case TYPE.CATEGORYINITIAL:
      filterInfo.CATEGORYLABEL = payload;
      filterInfo.categories = payload;
      return { ...state, categories: payload, CATEGORYLABEL: payload };
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
        dispatch({ type: TYPE.CATEGORYINITIAL, payload: list });
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
