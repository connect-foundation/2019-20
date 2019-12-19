import React, { createContext, useReducer, useEffect, useContext } from 'react';

import { childrenType } from '../types';
import { getCategoryList } from '../pages/main/fetch';
import { AlertMessageContext } from './AlertMessage';

const initialFilters = {
  price: { start: 0, end: 0, },
  categories: [],
  coordinates: '',
  distance: 0,
  localname: '전체',
  CATEGORYLABEL: [],
};

const FILTER_TYPE = {
  INITIAL: 0,
  CATEGORY_INITIAL: 1,
  PRICE: 2,
  CATEGORY_ADD: 3,
  CATEGORY_REMOVE: 4,
  LOCAL_NAME: 5,
  COORDINATE: 6,
  DISTANCE: 7,
};

const filterReducer = (state, { type, payload }) => {
  switch (type) {

    case FILTER_TYPE.INITIAL:
      return JSON.parse(JSON.stringify(initialFilters));

    case FILTER_TYPE.PRICE:
      return { ...state, price: { ...payload } };

    case FILTER_TYPE.CATEGORY_ADD:
      return { ...state, categories: [...state.categories, payload] };

    case FILTER_TYPE.CATEGORY_REMOVE: {
      const updatedCategory =
        state.categories.filter((name) => name !== payload);
      return { ...state, categories: updatedCategory };
    }

    case FILTER_TYPE.COORDINATE: {
      const { coordinates, localname } = payload;
      const distance = state.distance || 1;
      return { ...state, coordinates, localname, distance };
    }

    case FILTER_TYPE.CATEGORY_INITIAL:
      initialFilters.CATEGORYLABEL = payload;
      initialFilters.categories = payload;
      return { ...state, categories: payload, CATEGORYLABEL: payload };

    case FILTER_TYPE.DISTANCE:
      if (+payload === 0) {
        return { ...state, distance: +payload, localname: '전체' }
      }
      return { ...state, distance: +payload };

    default:
      return state;
  }
};

export const filterContext = createContext({});

export const FilterProvider = ({ children }) => {
  const [filter, dispatchFilter] = useReducer(filterReducer, initialFilters);
  const { dispatchMessage } = useContext(AlertMessageContext)
  const CATEOGRY_LABEL_LOAD_FAIL = '카테고리 정보를 불러 올 수 없습니다.';
  useEffect(() => {
    const getCategoryFromServer = async () => {
      try {
        const list = await getCategoryList();
        dispatchFilter({ type: FILTER_TYPE.CATEGORY_INITIAL, payload: list });
      } catch (err) {
        dispatchMessage({ type: 'error_message', payload: CATEOGRY_LABEL_LOAD_FAIL })
      }
    };
    getCategoryFromServer();
  }, [dispatchMessage]);
  return (
    <filterContext.Provider value={{ FILTER_TYPE, filter, dispatchFilter }}>
      {children}
    </filterContext.Provider>
  );
};

// https://stackoverflow.com/questions/42122522/reactjs-what-should-the-proptypes-be-for-this-props-children
FilterProvider.propTypes = {
  children: childrenType.isRequired,
};
