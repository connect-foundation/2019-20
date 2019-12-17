import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';
import Keyword from './keyword';
import promiseSearch from '../common/statics';
import { mongoosasticSettings } from '../../config';

const { Schema } = mongoose;

const KEYWORD_ANALYSIS_CYCLE = 5000;

const documentsToAnalyze = { title: [] };

const productSchema = new Schema({
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
    es_type: 'string',
    required: true,
    es_indexed: true,
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
    type: Array,
    required: false,
    es_type: 'string',
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
  buyer: {
    type: String,
    default: '',
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
}, {
  timestamps: { createdAt: true, updatedAt: true },
});

productSchema.plugin(mongoosastic, mongoosasticSettings);

productSchema.static('search', promiseSearch.bind(productSchema));

const pushKeywordForTokenization = (doc) => {
  documentsToAnalyze.title = [...documentsToAnalyze.title, doc.title];
};

productSchema.post('save', pushKeywordForTokenization);
productSchema.post('insertMany', (error, docs) => {
  docs.forEach(pushKeywordForTokenization);
});

const Product = mongoose.model('Product', productSchema);

Product.createMapping({
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
              'nori_readingform', 'lowercase',
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
              'MAG', 'MAJ', 'MM',
              'SP', 'SSC', 'SSO', 'SC', 'SE',
              'XPN', 'XSA', 'XSN', 'XSV',
              'UNA', 'NA', 'VSV',
            ],
          },
        },
      },
    },
  },
}, () => { });

const timer = setInterval(() => {
  const title = documentsToAnalyze.title.slice(0, 100).join(' ');
  documentsToAnalyze.title = documentsToAnalyze.title.slice(100);
  if (!title.length) {
    if (process.env.NODE_ENV === 'development') {
      clearInterval(timer);
      console.log('finish');
    }
    return;
  }
  const insertKeyword = (err, { tokens }) => {
    if (err) {
      return;
    }
    const words = tokens
      .filter(({ token }) => token.length >= 2)
      .map(({ token }) => ({ word: token }));
    const wordSet = new Set();
    words.forEach((word) => (wordSet.add(word)));
    wordSet.forEach(async (word) => {
      await Keyword.findOneAndUpdate(word, word, { upsert: true });
    });
  };
  Product.esClient.indices.analyze({
    index: 'products',
    body: {
      text: title,
      analyzer: 'korean',
    },
  }, insertKeyword);
}, KEYWORD_ANALYSIS_CYCLE);

module.exports = Product;
