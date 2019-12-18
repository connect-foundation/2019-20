import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

// context
import {ChatSocketProvider, ChatSocketContext} from '../contexts/Socket';

const HOST = 'http://10.180.171.184:5000';
const NAME_SPACE = '/chat';

export default function Chat() {
  const history = useHistory();
  const {chatSocket} = useContext(ChatSocketContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [sellerId, setSellerId] = useState(null);
  const [roomId, setRoomId] = useState(null);

  const enterUserId = (e) => {
    setCurrentUser(e.target.value);
  };
  const enterSellerId = (e) => {
    setSellerId(e.target.value);
  };
  const enterRoomId = (e) => {
    setRoomId(e.target.value);
  };

  // service
  const enterRoom = (id) => {
    chatSocket.emit('enterRoom', id);
    history.push(`/chat/room/${id}`);
  };

  const getRoomId = async (options) => {
    try {
      const {
        data: {_id},
      } = await axios.post(HOST + NAME_SPACE, options);
      return _id;
    } catch (error) {
      return null;
    }
  };

  const startChat = async (e) => {
    e.preventDefault();
    switch (e.target.value) {
      case 'sellerid-buyerid':
        if (currentUser && sellerId) {
          const fetchedRoomId = await getRoomId({
            buyerId: currentUser,
            sellerId,
            productId: 10,
          });
          enterRoom(fetchedRoomId);
        }
        break;
      case 'roomid':
        if (roomId) {
          enterRoom(roomId);
        }
        break;
      default:
        break;
    }
  };
  return (
    <ChatSocketProvider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '90vh',
          height: '50vh',
          margin: 'auto',
        }}
      >
        <div
          style={{flex: 1, borderRight: '1px solid grey', textAlign: 'center'}}
        >
          <input onChange={enterUserId} placeholder='구매자 아이디' />
          <input onChange={enterSellerId} placeholder='판매자 아이디' />
          <button type='button' onClick={startChat} value='sellerid-buyerid'>
            채팅 시작
          </button>
          ㅜ
        </div>
        <div style={{flex: 1, textAlign: 'center'}}>
          <input onChange={enterRoomId} placeholder='채팅방 아이디' />
          <button type='button' onClick={startChat} value='roomid'>
            채팅 시작
          </button>
        </div>
      </div>
    </ChatSocketProvider>
  );
}
