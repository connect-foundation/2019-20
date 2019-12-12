import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UseCredentialFetch = (uri, callback, errCallback) => {
  const [loading, setLoading] = useState(false);

  const fetchData = async (uri) => {
    setLoading(true);

    const options = {
      method: 'get',
      url: uri,
      withCredentials: true,
    };

    try {
      const {data} = await axios(options);
      callback(data);
      setLoading(false);
    } catch (err) {
      errCallback(err);
    }
  };

  useEffect(() => {
    fetchData(uri);
  }, []);

  return loading;
};

export default UseCredentialFetch;
