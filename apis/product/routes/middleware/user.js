import axios from 'axios';
import { VERFIY_TOKEN_URI } from '../../assets/uri';

const isLoggedInUser = async (req, res, next) => {
  // try {
  //   const response = await axios.get(VERFIY_TOKEN_URI, {
  //     headers: { 'Set-Cookie': `jwt=${req.cookies.jwt}` }
  //   })
  //   if (response.status !== 200) {
  //     next({ status: 403, message: '비정상적인 접근' })
  //   } else {
  //     res.locals = response.data.id;
  //     next();
  //   }
  // } catch (e) {
  //   next({ status: 500, message: e.toString() });
  // }
  res.locals.userId = '김철수'
  next();
};

export default isLoggedInUser;
