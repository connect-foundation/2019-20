import { createChatRoom, addMessage, findChatRoom } from '../../core';

export const startChat = async (req, res, next) => {
  const { buyerId, sellerId, productId } = req.body;

  try {
    const result = await createChatRoom(buyerId, sellerId, productId);
    console.log(result);
    res.json(result);
  } catch (e) {
    console.log(e);
    next({ status: 400, message: e });
  }
};

export const saveMessage = async (req, res, next) => {
  const roomId = req.params.id;
  const { userId, content } = req.body;

  try {
    const result = await addMessage(roomId, userId, content);
    res.json(result);
  } catch (e) {
    next({ status: 400, message: e });
  }
};

export const getChat = async (req, res, next) => {
  const roomId = req.params.id;
  const { userId } = req.body;

  try {
    const result = await findChatRoom(roomId, userId);
    res.json(result);
  } catch (e) {
    next({ status: 400, message: e });
  }
};

export default {
  startChat,
  saveMessage,
  getChat,
};
