import mongoose from 'mongoose';

export default async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(`${process.env.MONGO_URL}`, options, (err) => {
    if (err) {
      throw new Error(err);
    }
  });


  const db = mongoose.connection;
  db.on('err', () => {
    throw new Error('connection Error');
  });
};
