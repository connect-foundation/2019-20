import { Chat } from '../db/model';

export const checkChatRoomExistance = async (buyer, seller, product) => {
  try {
    const result = await Chat.findOne({
      'buyer._id': buyer._id,
      'seller._id': seller._id,
      'product._id': product._id,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const createChatRoom = async (buyer, seller, product) => {
  try {
    const existChatRoom = await checkChatRoomExistance(buyer, seller, product);
    if (existChatRoom) return existChatRoom;

    const result = await Chat.create({
      buyer,
      seller,
      product,
      messages: [],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const addMessage = async (roomId, userId, content) => {
  try {
    const room = await Chat.findById(roomId);
    if (room.buyer._id !== userId && room.seller._id !== userId) {
      console.error('맞지 않는 유저');
      return;
    }
    room.messages.push({
      userId,
      content,
    });
    await room.save();
  } catch (error) {
    console.error(error);
  }
};

export const findChatRoom = async (roomId, userId) => {
  try {
    const room = await Chat.findById(roomId);
    if (room.buyer._id !== userId && room.seller._id !== userId) {
      console.error('맞지 않는 유저');
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllChatRoomsByUId = async (userId) => {
  if (!userId) return [];
  try {
    const room = await Chat.find({
      $or: [{ 'buyer._id': userId }, { 'seller._id': userId }],
    });

    return room;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const isValidChatUser = async (roomId, userId) => {
  try {
    const room = await Chat.findById(roomId);
    if (room.buyer._id !== userId && room.seller._id !== userId) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getAllMesages = async (roomId) => {
  try {
    const room = await Chat.findById(roomId);
    return room.messages;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export default {
  createChatRoom,
  addMessage,
  findChatRoom,
};
