import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';
import dotenv from 'dotenv';

dotenv.config();

const { Schema } = mongoose;
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      es_indexed: true,
      es_analyzer: 'korean',
      es_type: 'text',
    },
    userId: {
      type: String,
      required: true,
      es_indexed: true,
    },
    order: {
      type: Date,
      default: Date.now,
      required: true,
      es_type: 'date',
      es_indexed: true,
    },
    areaRange: {
      type: String,
      enum: ['1', '2', '3'],
      default: '1',
      required: true,
      es_type: 'string',
      es_indexed: true,
    },
    price: {
      type: Number,
      required: true,
      es_type: 'integer',
      es_indexed: true,
    },
    pictures: {
      type: Array,
      validate: {
        validator(pictures) {
          return pictures.length <= 10;
        },
        message: '10장 이하의 사진만 등록 가능합니다.',
      },
      required: true,
    },
    location: {
      geo_point: {
        type: String,
        es_indexed: true,
        es_type: 'geo_point',
      },
      lat: { type: Number },
      lon: { type: Number },
    },
    contents: {
      type: String,
      required: true,
    },
    negotiable: {
      type: Boolean,
      default: false,
      required: true,
    },
    hits: {
      type: Number,
      default: 0,
      required: true,
      es_type: 'integer',
      es_indexed: true,
    },
    interests: {
      type: Number,
      default: 0,
      required: true,
      es_type: 'integer',
      es_indexed: true,
    },
    currentStatus: {
      type: String,
      enum: ['대기', '거래중', '거래완료', '비공개'],
      default: '대기',
      required: true,
      es_type: 'string',
      es_indexed: true,
    },
    productStatus: {
      type: String,
      enum: ['미개봉', '미사용', 'A급', '사용감 있음', '전투용', '고장/부품'],
      required: true,
    },
    deliverAvailable: {
      type: Boolean,
      required: true,
    },
    category: {
      type: String,
      enum: [
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
      ],
      es_type: 'string',
      required: true,
      es_indexed: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  },
);

productSchema.plugin(mongoosastic, {
  hosts: [`${process.env.ELASTICSEARCH}`],
  bulk: {
    size: 100,
    delay: 1000,
  },
  filter: (doc) => doc.currentStatus === '비공개',
  type: '_doc',
});

function customSearch(query, options) {
  return new Promise((resolve, reject) => {
    this.esSearch(query, options, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

productSchema.static('search', customSearch);

const Product = mongoose.model('Product', productSchema);

Product.createMapping(
  {
    settings: {
      index: {
        analysis: {
          tokenizer: {
            nori_user_dict: {
              type: 'nori_tokenizer',
              decompound_mode: 'mixed',
              user_dictionary: 'userdict_ko.txt',
            },
          },
          analyzer: {
            korean: {
              type: 'custom',
              tokenizer: 'nori_user_dict',
              filter: [
                'nori_readingform',
                'lowercase',
                'nori_part_of_speech_basic',
              ],
            },
          },
          filter: {
            nori_part_of_speech_basic: {
              type: 'nori_part_of_speech',
              stoptags: [
                'E',
                'IC',
                'J',
                'MAG',
                'MAJ',
                'MM',
                'SP',
                'SSC',
                'SSO',
                'SC',
                'SE',
                'XPN',
                'XSA',
                'XSN',
                'XSV',
                'UNA',
                'NA',
                'VSV',
              ],
            },
          },
        },
      },
    },
  },
  () => {},
);

module.exports = Product;
