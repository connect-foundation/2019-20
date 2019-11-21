import mongoose from 'mongoose';
import model from '../model';

require('dotenv').config();

mongoose.connect(`${process.env.MONGO_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const initData = {
  title: 'HappyHacking',
  userId: 'HelloWorld',
  latitude: 112.1231,
  longitude: 422.1231,
  zipCode: '12345',
  areaRange: '1',
  price: 200000,
  pictures: [],
  contents: '해피해킹 팝니다',
  negotiable: true,
  currentStatus: '대기',
  productStatus: '미개봉',
  deliverAvailable: true,
  category: '디지털/가전',
};

const { product } = model;
product.create(initData, () => {
  db.close();
});
