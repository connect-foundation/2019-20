/* eslint-disable no-underscore-dangle */
// https://www.mockaroo.com/
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import model from '../db/model';
import mock from './mock-data';
import mockData from './mock-datas';
import message from '../core/message';
import * as Core from '../core';
import 'core-js';

const Product = model.product;

dotenv.config();
jest.setTimeout(10000);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
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
    await Core.updateProduct(product._id, userId, { title: titleChanged });
    expect((await Product.findById(product._id)).title).toBe(titleChanged);
  });
  test('잘못된 데이터로 수정했을 때 예외처리가 되는지 검사', async () => {
    const categoryChanged = '가가가가';
    await expect(Core.updateProduct(product._id, userId, { category: categoryChanged }))
      .rejects
      .toThrow(message.errorProcessing);
  });
  test('스키마에 정의되지 않는 데이터가 들어갔을 때 추가가 안되는지 검사', async () => {
    await Core.updateProduct(product._id, userId, {
      testaaa: 'ㅏㅏㅏㅏㅏㅏ',
    });
    const reProduct = await Product.findById(product._id);
    expect(reProduct.testaaa).toBe(undefined);
  });
  test('정상적이지 않은 사용자가 document 수정이 불가능하지 검사', async () => {
    const id = '123123';
    await expect(Core.updateProduct(product._id, id, {
      title: '123',
    })).rejects.toThrow(message.errorProcessing);
  });
});

describe('core: removeProduct method', () => {
  let product;
  const { userId } = mock;
  beforeEach(async () => {
    product = await Product.create(mock);
  });
  afterEach(async () => {
    await product.deleteOne({ _id: product._id });
  });
  test('존재하지 않는 데이터 삭제 테스트', async () => {
    const result = await Core.removeProduct('aaaa', userId);
    expect(result).toBe(0);
  });
  test('존재하는 데이터 삭제 검사', async () => {
    const result = await Core.removeProduct(product._id, userId);
    expect(result).toBe(1);
  });
  test('존재하는 데이터이지만 유저정보가 일치하지 않는 경우 삭제 검사', async () => {
    const result = await Core.removeProduct(product._id, userId);
    expect(result).toBe(1);
  });
});

describe('core: getProducts method', () => {
  const inputData = mockData.slice(0, 100);
  beforeAll(async () => {
    await Product.create(inputData);
  });
  afterAll(async () => {
    await Product.remove({});
  });
  test('페이지네이션 마지막페이지 불러오기, 11개씩, 10페이지 (1개 출력)', async () => {
    const result = await Core.getProducts(10, 11);
    expect(result).toHaveLength(1);
  });
  test('1개의 데이터만 조회검사', async () => {
    const result = await Core.getProducts(1, 1);
    expect(result).toHaveLength(1);
  });
  test('존재하지 않는 데이터가 검색 결과', async () => {
    const result = await Core.getProducts(1, 2, {
      keyword: { $regex: 'ㅏㅏㅏㅏㅏㅏㅏㅏㅏ' },
    });
    expect(result).toHaveLength(0);
  });
  test('정상적으로 데이터를 검색하는 지 검사', async () => {
    const keyword = new RegExp(inputData[0].title);
    const expectResult = inputData.filter((data) => keyword.test(data.title));
    const result = await Core.getProducts(1, inputData.length, { title: { $regex: keyword } });
    expect(result).toHaveLength(expectResult.length);
  });
});

describe('core: deleteProduct method', () => {
  const inputData = mockData.slice(0, 1);
  afterAll(async () => {
    await Product.remove({});
  });
  test('정상적인 데이터 삽입 확인', async () => {
    await Core.insertProduct(inputData[0]);
    expect(await Product.count()).toBe(1);
  });
  test('비정상적인 데이터 삽입이 안되는지 검사', async () => {
    const abnormalData = inputData[0];
    abnormalData.category = '존재하지 않는 항목';
    await expect(Core.insertProduct(inputData[0])).rejects.toThrow(message.errorProcessing);
  });
  test('필수 항목 누락이 되었을 때 삽입이 안되는지 검사', async () => {
    const abnormalData = JSON.parse(JSON.stringify(inputData[0]));
    delete abnormalData.title;
    await expect(Core.insertProduct(inputData[0])).rejects.toThrow(message.errorProcessing);
  });
});
