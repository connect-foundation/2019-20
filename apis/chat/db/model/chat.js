import mongoose from 'mongoose';
import uuidv1 from 'uuid/v1';

const { Schema } = mongoose;

const chatSchema = new Schema({
  _id: { type: String, default: uuidv1 },
  product: {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    pictures: [{ mobile: String, deskTop: String }],
  },
  buyer: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
  },
  seller: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
  },
  messages: [
    {
      userId: String,
      content: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  lastestAt: { type: Date, default: Date.now },
  // buyerId: {type: String, required: true},
  // sellerId: {type: String, required: true},
});

const ChatModel = mongoose.model('Chat', chatSchema);
export default ChatModel;
