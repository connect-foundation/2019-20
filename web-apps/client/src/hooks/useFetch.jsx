import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UseFetch = (uri, callback) => {
  const [loading, setLoading] = useState(false);

  const fetchData = async (uri) => {
    setLoading(true);
    let data;
    if (typeof uri === 'string') {
      const response = await axios.get(uri);
      data = await response.json();
    } else {
      data = uri;
    }
    callback(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(uri);
  }, []);

  return loading;
};

export default UseFetch;
