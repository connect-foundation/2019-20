export const mongoosasticSettings = {
  hosts: process.env.ELASTICSEARCH,
  port: process.env.ESPORT,
  bulk: {
    size: 100,
    delay: 1000,
  },
};

export const redisConnection = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
};
