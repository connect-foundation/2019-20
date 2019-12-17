import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UseFetch = (uri, callback) => {
  const [loading, setLoading] = useState(false);

  const getMockData = (uri) => {
    if (uri === 'category') {
      const category = [
        '디지털/가전',
        '가구/인테리어',
        '유아동/유아도서',
        '생활/가공식품',
        '여성의류',
        '여성잡화',
        '뷰티/미용',
        '남성패션/잡화',
        '스포츠/레저',
        '게임/취미',
        '도서/티켓/음반',
        '반려동물용품',
        '기타 중고물품',
      ];
      return category;
    } else if (uri === 'statusType') {
      const statusTypeList = [
        '미개봉',
        '미사용',
        'A급',
        '사용감 있음',
        '전투용',
        '고장/부품',
      ];
      return statusTypeList;
    }
  };

  const fetchData = async (uri) => {
    setLoading(true);
    let data;
    if (uri === 'category' || uri === 'statusType') {
      data = getMockData(uri);
    } else {
      const response = await axios.get(uri);
      data = await response.json();
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

// import React, {useState, useEffect} from 'react';
// import axios from 'axios';
//
// const UseFetch = (uri, callback, errHandler) => {
//   const [loading, setLoading] = useState(false);
//
//   const fetchData = async (uri) => {
//     setLoading(true);
//     try {
//       const {data} = await axios.get(uri);
//       callback(data);
//     } catch (e) {
//       errHandler();
//       return;
//     }
//     setLoading(false);
//   };
//
//   useEffect(() => {
//     fetchData(uri);
//   }, []);
//
//   return loading;
// };
//
// export default UseFetch;
