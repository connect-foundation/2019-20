import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UseFetch = (uri, callback, errHandler) => {
  const [loading, setLoading] = useState(false);

  const fetchData = async (uri) => {
    setLoading(true);
    try {
      const {data} = await axios.get(uri);
      callback(data);
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
