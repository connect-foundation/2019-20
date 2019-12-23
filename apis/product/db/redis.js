import bluebird from 'bluebird';
import redis from 'redis';
import { redisConnection } from '../config';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(redisConnection);

export default client;
