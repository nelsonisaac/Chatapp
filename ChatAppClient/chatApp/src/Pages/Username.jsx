import React from 'react';
import { Card, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './PageStyle.css';
import { useNavigate } from 'react-router-dom';
import { addUser,connectWebsocket,disconnectWebsocket,stompClient  } from '../Components/WebSocket.jsx';

const { Title, Text } = Typography;

const Username = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    const name = document.getElementById('userName').value;
    if (name.trim) {
      localStorage.setItem('username', name);
      establishConnection(name);
      navigate('/dashboard');
    }
  };

  const establishConnection = (name) => {
    connectWebsocket();
    const interval = setInterval(() => {
        if (stompClient.connected) {
            addUser(name);
            clearInterval(interval);
            // Cleanup function
            return () => {
                disconnectWebsocket();
            };
        }
    }, 500);
    return () => clearInterval(interval); 
  }

  return (
    <div className="username">
      <Text> Type your username to enter into Chatroom</Text>
      <Card className="card">
        <input
          type="text"
          placeholder="type here"
          className="userinput"
          id="userName"
        />
        <button className="usernameButton" onClick={handleLogin}>
          <SendOutlined style={{ color: '#1890ff' }} />
        </button>
      </Card>
    </div>
  );
};

export default Username;
