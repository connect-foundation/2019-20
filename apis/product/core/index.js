import model from '../db/model';
import message from './message';

const Product = model.product;

/**
 * 중고 상품 등록
 * @param {*} contents 새로운 데이터(Product 스키마를 따름)
 * @returns {Promise<String>} Object(등록 완료)
 */
const insertProduct = async (contents) => {
  try {
    const result = await Product.create(contents);
    return result;
  } catch (e) {
    throw Error(message.errorProcessing);
  }
};

/**
 * 등록된 중고상품 조회
 * @description 검색 조건에 일치하는 정보를 찾아 리스트로 반환합니다.
 * @param {Number} page 페이지네이션 번호 (default 1)
 * @param {Number} limits 총 출력할 갯수 (default 10)
 * @param {Object} options where 조건(필터) (default {})
 * @param {Object} sort 정렬 방법 (default { order:-1, createdAt: -1})
 * @returns {Promise<(Object|Array)>} Array(조회 결과)
 */
const getProducts = async (page = 1, limits = 10,
  options = {}, sort = { order: -1, createdAt: -1 }) => {
  try {
    const result = await Product
      .find(options || {})
      .sort(sort)
      .skip((page - 1) * limits)
      .limit(limits);
    return result;
  } catch (e) {
    throw Error(message.errorProcessing);
  }
};

/**
 * 등록된 중고상품 정보 수정
 * @description 유저 아이디와 실제 document를 등록한 사용자가 일치할 경우에만 해당 정보를 수정합니다.
 * @param {String} _id 기본키(Object_ID)
 * @param {String} userId 유저정보(사용자)
 * @param {Object} contents 업데이트할 내용(product 모델 참조)
 * @return {Promise<Object>} Object(Product object)
 */
const updateProduct = async (_id, userId, contents) => {
  try {
    const product = await Product.findById(_id);
    if (product.userId !== userId) {
      throw Error(message.doNotHavePermission);
    }
    Object.keys(contents).forEach((key) => {
      product[key] = contents[key];
    });
    const result = await product.save();
    return result;
  } catch (e) {
    throw Error(message.errorProcessing);
  }
};

/**
 * 등록된 중고상품 삭제
 * @description 유저 아이디와 실제 document를 등록한 사용자가 일치할 경우에만 해당 정보를 삭제합니다..
 * @param {String} _id 기본키(Object_ID)
 * @param {String} userId 유저정보(사용자)
 * @return {Promise<Number>} 삭제 성공시 1, 실패 시 0
 */
const removeProduct = async (_id, userId) => {
  try {
    const result = await Product.remove({ _id, userId });
    return result.deletedCount;
  } catch (e) {
    return 0;
  }
};

const getProductSchemaByKey = (key) => Product.schema.path(key);

export {
  insertProduct,
  updateProduct,
  removeProduct,
  getProducts,
  getProductSchemaByKey,
};
