import {
  createChatRoom,
  addMessage,
  findChatRoom,
  getAllChatRoomsByUId,
} from '../../core';

export const startChat = async (req, res, next) => {
  const { buyer, seller, product } = req.body;
  try {
    const result = await createChatRoom(buyer, seller, product);
    res.json(result);
  } catch (e) {
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

export const getChatByQuery = async (req, res, next) => {
  const { uid } = req.query;
  if (!uid) next({ status: 400, message: 'no matching chat' });
  try {
    const result = await getAllChatRoomsByUId(uid);
    res.json(result);
  } catch (e) {
    next({ status: 400, message: e });
  }
};

export default {
  startChat,
  saveMessage,
  getChat,
  getChatByQuery,
};
