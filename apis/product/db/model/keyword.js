import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';
import promiseSearch from '../common/statics';
import { mongoosasticSettings } from '../../config';

const { Schema } = mongoose;

const keywordScheme = new Schema({
  word: {
    type: String,
    required: true,
    es_indexed: true,
    es_type: 'text',
    unique: true,
  },
});

keywordScheme.plugin(mongoosastic, mongoosasticSettings);

keywordScheme.static('search', promiseSearch);

const Keyword = mongoose.model('Keyword', keywordScheme);


module.exports = Keyword;
