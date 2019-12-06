import mongoose from 'mongoose';
import uuidv1 from 'uuid/v1';

const { Schema } = mongoose;

const chatSchema = new Schema({
  _id: { type: String, default: uuidv1 },
  productId: String,
  buyerId: Number,
  sellerId: Number,
  messages: [
    {
      userId: Number,
      content: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const ChatModel = mongoose.model('Chat', chatSchema);
export default ChatModel;
