/* eslint-disable*/
import mongoose from 'mongoose';

export default () => {
  mongoose.connect('mongodb://localhost:3300/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected successfully.');
    // we're connected!
  });
};