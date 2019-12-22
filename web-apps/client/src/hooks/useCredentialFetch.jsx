import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

const UseCredentialFetch = (uri, callback, errCallback) => {
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (_uri) => {
      setLoading(true);
      const options = {
        method: 'get',
        url: _uri,
        withCredentials: true,
      };

      try {
        const {data} = await axios(options);
        callback(data);
        setLoading(false);
      } catch (err) {
        errCallback(err);
      }
    },
    [callback, errCallback],
  );

  useEffect(() => {
    fetchData(uri);
  }, [fetchData, uri]);

  return loading;
};
export default UseCredentialFetch;
