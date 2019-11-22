/* eslint-disable no-underscore-dangle */
// https://www.mockaroo.com/
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import model from '../db/model';
import mock from './mock-data';
import updateProduct from '../core/index';
import message from '../core/message';

import 'core-js';

const Product = model.product;

dotenv.config();

beforeAll(() => {
  mongoose.connect(process.env.MONGO_TEST_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(() => {
  mongoose.disconnect();
});

describe('core: productUpate method', () => {
  let product;
  const { userId } = mock;
  beforeEach(async () => {
    product = await Product.create(mock);
  });
  afterEach(async () => {
    await product.deleteOne({ _id: product._id });
  });
  test('기존 데이터 수정 테스트', async () => {
    const titleChanged = '가나다라';
    await updateProduct(product._id, userId, { title: titleChanged });
    expect((await Product.findById(product._id)).title).toBe(titleChanged);
  });
  test('잘못된 데이터로 수정했을 때 예외처리가 되는지 검사', async () => {
    const categoryChanged = '가가가가';
    const result = await updateProduct(product._id, userId, { category: categoryChanged });
    const prefixMessage = result.split('|')[0].trim();
    expect(prefixMessage).toBe(message.errorProcessing);
  });
  test('스키마에 정의되지 않는 데이터가 들어갔을 때 추가가 안되는지 검사', async () => {
    await updateProduct(product._id, userId, {
      testaaa: 'ㅏㅏㅏㅏㅏㅏ',
    });
    const reProduct = await Product.findById(product._id);
    expect(reProduct.testaaa).toBe(undefined);
  });
  test('정상적이지 않은 사용자가 document 수정이 불가능하지 검사', async () => {
    const id = '123123';
    const result = await updateProduct(product._id, id, {
      title: '123',
    });
    expect(result).toBe(message.doNotHavePermission);
  });
});
