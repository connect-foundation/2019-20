export const mongoosasticSettings = (process.env.NODE_ENV === 'test') ? {} : {
  hosts: process.env.ELASTICSEARCH,
  port: process.env.ESPORT,
  bulk: {
    size: 100,
    delay: 1000,
  },
};

export const redisConnection = {
  port: 6379,
  host: '127.0.0.1',
  password: 'test132@',
};
