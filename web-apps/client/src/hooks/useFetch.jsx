import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { category, statusTypeList } from '../assets/list';

const UseFetch = (uri, callback, errHandler) => {
  const [loading, setLoading] = useState(false);

  const getMockData = (uri) => {
    if (uri === 'category') {
      return category;
    } else if (uri === 'statusType') {
      return statusTypeList;
    }
    return [];
  };

  const fetchData = async (uri) => {
    setLoading(true);
    try {
      const mockData = getMockData(uri);
      if (mockData.length) {
        callback(mockData);
      } else {
        const { data } = await axios.get(uri);
        callback(data);
      }
    } catch (e) {
      errHandler();
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(uri);
  }, []);

  return loading;
};

export default UseFetch;
