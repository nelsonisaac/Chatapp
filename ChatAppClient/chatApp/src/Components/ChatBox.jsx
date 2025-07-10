import { useEffect, useState } from 'react';
import {
  stompClient,
  connectWebsocket,
  disconnectWebsocket,
  sendMessage
} from '../Components/WebSocket.jsx';
import Card from 'antd/es/card/Card.js';

const ChatBox = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    connectWebsocket();

    const subscribeToMessages = () => {
      if (stompClient.connected) {
        console.log("WebSocket connected, subscribing...");
        const subscription = stompClient.subscribe("/topic/public", (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log("this is recieved msg: " + message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
        return subscription; // Return subscription for cleanup
      }
    };

    // Wait for connection to establish before subscribing
    const interval = setInterval(() => {
      if (stompClient.connected) {
        const subscription = subscribeToMessages();
        clearInterval(interval);

        // Cleanup function
        return () => {
          if (subscription) subscription.unsubscribe();
          disconnectWebsocket();
        };
      }
    }, 500);

    return () => clearInterval(interval); // Cleanup in case component unmounts before connection
  }, []);

  const handleClick = () => {
    if (text.trim()) {
      sendMessage(text);
      setText('');
    }
  };

  return (
    <div className='container-fluid h-100'>
      {messages.map((msg, index) => (
        <div key={index} className="" style={{}}>
          {
            msg.chat == null ?
              <p className='text-center'>🎊 {msg.user} joined the chatroom 🎊</p> :
              <div className='d-flex justify-content-between border p-2'>
                <Card>
                  <p className="fw-bold m-0" >
                    {msg.user}
                  </p>
                </Card>

                <p className="m-0 text-end">
                  {msg.chat == null ? msg.user + " joined" : msg.chat}
                </p>
              </div>
          }

        </div>
      ))}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleClick}>send</button>
    </div>
  );
};

export default ChatBox;
