import mongoose from 'mongoose';

export const dbConnect = () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: false,
  };
  let errorMessage;
  mongoose.connect(`${process.env.MONGO_URL}`, options, (err) => {
    if (err) {
      errorMessage = err.toString();
    }
  });
  return (req, res, next) => {
    if (errorMessage) {
      next({ status: 500, message: errorMessage });
    } else {
      next();
    }
  };
};

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
