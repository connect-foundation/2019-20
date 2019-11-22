import model from '../db/model';
import message from './message';

const Product = model.product;

/**
 * 등록된 중고상품 정보 수정
 * @description 유저 아이디와 실제 document를 등록한 사용자가 일치할 경우에만 해당 정보를 수정합니다.
 * @param {String} _id 기본키(Object_ID)
 * @param {String} userId 유저정보(사용자)
 * @param {Object} contents 업데이트할 내용(product 모델 참조)
 * @return {Promise<String|Object>} String(오류 메시지) | Object(Product object)
 */
const updateProduct = async (_id, userId, contents) => {
  try {
    const product = await Product.findById(_id);
    if (product.userId !== userId) {
      return message.doNotHavePermission;
    }
    Object.keys(contents).forEach((key) => {
      product[key] = contents[key];
    });
    const result = await product.save();
    return result;
  } catch (e) {
    return `${message.errorProcessing} | ${e.toString()}`;
  }
};

export default updateProduct;
