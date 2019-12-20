import mongoose from 'mongoose';
import fs from 'fs';

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
  host: process.env.ELASTICSEARCH,
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

export const sslOptions = {
  key: fs.readFileSync(process.env.KEY),
  cert: fs.readFileSync(process.env.CERT)
};
