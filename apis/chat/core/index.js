import {Chat} from '../db/model';

export const checkChatRoomExistance = async (buyerId, sellerId, productId) => {
  try {
    const result = await Chat.findOne({
      buyerId,
      sellerId,
      productId,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const createChatRoom = async (buyerId, sellerId, productId) => {
  try {
    const existChatRoom = await checkChatRoomExistance(
      buyerId,
      sellerId,
      productId,
    );
    if (existChatRoom) return existChatRoom;

    const result = await Chat.create({
      buyerId,
      sellerId,
      productId,
      messages: [],
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const addMessage = async (roomId, userId, content) => {
  try {
    const room = await Chat.findById(roomId);
    console.log(room.buyerId, room.sellerId, userId);
    if (room.buyerId !== userId && room.sellerId !== userId) {
      console.log('맞지 않는 유저');
      return;
    }
    room.messages.push({
      userId,
      content,
    });
    const result = await room.save();
    return result.messages[result.messages.length - 1];
  } catch (error) {
    console.log(error);
  }
};

export const findChatRoom = async (roomId, userId) => {
  try {
    const room = await Chat.findById(roomId);
    if (room.buyerId !== userId && room.sellerId !== userId) {
      console.log('맞지 않는 유저');
      return;
    }
    return room;
  } catch (error) {
    console.log(error);
  }
};

export const isValidChatUser = async (roomId, userId) => {
  try {
    const room = await Chat.findById(roomId);
    if (room.buyerId !== userId && room.sellerId !== userId) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMesages = async (roomId) => {
  try {
    const room = await Chat.findById(roomId);
    return room.messages;
  } catch (error) {
    console.log(error);
  }
};
export default {
  createChatRoom,
  addMessage,
  findChatRoom,
};
