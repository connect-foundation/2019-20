import mongoose from 'mongoose';

export default async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(`${process.env.MONGO_URL}`, options, (err) => {
    if (err) {
      console.error(err);
      throw new Error('몽고 디비 에러');
    }
  });
  console.error('mongoose 연결됨!');
  const db = mongoose.connection;
  db.on('err', () => {
    throw new Error('connection Error');
  });
};
