import 'dotenv/config';
import mongoose from 'mongoose';
import model from '../model';
import mock from './20191209.json';

const { product, keyword } = model;

(async () => {
  try {
    mongoose.connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await mongoose.connection;
    await product.deleteMany({});
    await keyword.deleteMany({});
    await product.create(mock);
  } catch (e) {
    console.log(e);
  }
})();
