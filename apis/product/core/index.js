import model from '../db/model';
import message from './message';
import CODE from './code';

const Product = model.product;

const Core = {
  lastModifed: Date.now(),
  getLastModified() {
    return Core.lastModifed;
  },
  refreshLastModified() {
    Core.lastModifed = Date.now();
  },
  /**
 * 중고 상품 등록
 * @param {*} contents 새로운 데이터(Product 스키마를 따름)
 * @returns {Promise<String>} Object(등록 완료)
 */
  async insertProduct(contents) {
    Core.refreshLastModified();
    try {
      const result = await Product.create(contents);
      return result;
    } catch (e) {
      throw Error(message.errorProcessing);
    }
  },

  /**
   * 등록된 중고상품 조회
   * @description 검색 조건에 일치하는 정보를 찾아 리스트로 반환합니다.
   * @param {Number} page 페이지네이션 번호 (default 1)
   * @param {Number} limits 총 출력할 갯수 (default 10)
   * @param {Object} options where 조건(필터) (default {})
   * @param {Object} sort 정렬 방법 (default { order:-1, createdAt: -1})
   * @returns {Promise<(Object|Array)>} Array(조회 결과)
   */
  async getProducts(page = 1, limits = 10,
    options = {}, sort = { order: -1, createdAt: -1 }) {
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
  },

  /**
   * 등록된 중고상품 정보 수정
   * @description 유저 아이디와 실제 document를 등록한 사용자가 일치할 경우에만 해당 정보를 수정합니다.
   * 상태값이 '비공개'일 경우 일래스틱 서치에서 인덱스 목록에 제거합니다.
   * @param {String} _id 기본키(Object_ID)
   * @param {String} userId 유저정보(사용자)
   * @param {Object} contents 업데이트할 내용(product 모델 참조)
   * @return {Promise<Object>} Object(Product object)
   */
  async updateProduct(_id, userId, contents) {
    const isCurrentStatusPrivate = (document) => document.currentStatus === '비공개';
    Core.refreshLastModified();
    try {
      const product = await Product.findById(_id);
      if (product.userId !== userId) {
        throw Error(message.doNotHavePermission);
      }
      Object.keys(contents).forEach((key) => {
        product[key] = contents[key];
      });
      if (isCurrentStatusPrivate(product)) {
        await product.unIndex();
      }
      const result = await product.save();
      return result;
    } catch (e) {
      throw Error(message.errorProcessing);
    }
  },

  /**
   * 등록된 중고상품 삭제
   * @description 유저 아이디와 실제 document를 등록한 사용자가 일치할 경우에만 해당 정보를 삭제합니다..
   * @param {String} _id 기본키(Object_ID)
   * @param {String} userId 유저정보(사용자)
   * @return {Promise<Number>} 삭제 성공시 1, 실패 시 0
   */
  async removeProduct(_id, userId) {
    Core.refreshLastModified();
    try {
      const product = await Product.findById({ _id });
      if (product.userId !== userId) {
        return CODE.ERASERDATAFAIL;
      }
      await product.remove();
      return CODE.ERASERDATASUCCESS;
    } catch (e) {
      return CODE.ERASERDATAFAIL;
    }
  },

  /**
   * 일래스틱 서치 검색
   * @description 일래스틱 서치 검색결과를 조회합니다.
   * @param {Object.<from, size, filter, query, sort>} esquery 일래스틱 서치 쿼리
   * @param esquery.from 시작 지점(페이지 네이션)
   * @param esquery.size 한번에 보여줄 페이지의 수
   * @param esquery.query 일래스틱 서치 쿼리
   * @param esquery.sort 일래스틱 서치 정렬
   */
  async getElasticSearchResults(esquery) {
    let sort = esquery.sort || [];
    const isNotDefaultSetSortOption = (arr) => !arr || !arr.includes((info) => 'order' in info);
    if (isNotDefaultSetSortOption(sort)) {
      sort = [
        ...sort,
        { order: 'desc' },
      ];
    }
    const query = { ...esquery, sort };
    try {
      const respone = await Product.search(query, {});
      const result = respone.hits.hits;
      return result;
    } catch (e) {
      throw new Error(message.errorProcessingElasticSearch);
    }
  },
  getProductSchemaByKey(key) {
    return Product.schema.path(key);
  },
};

export const {
  insertProduct,
  updateProduct,
  removeProduct,
  getProducts,
  getProductSchemaByKey,
  getElasticSearchResults,
  getLastModified,
} = Core;
