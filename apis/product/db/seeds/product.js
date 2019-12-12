import mongoose from 'mongoose';
import model from '../model';
import mock from './20191209.json';

const { product } = model;

mongoose.connect(`${process.env.MONGO_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async () => {
  try {
    const db = await mongoose.connection;
    await product.deleteMany({});
    await product.create(mock);
    db.close();
  } catch (e) {
    throw Error(e);
  }
})();
