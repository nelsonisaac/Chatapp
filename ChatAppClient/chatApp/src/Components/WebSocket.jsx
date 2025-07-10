import { Client } from '@stomp/stompjs';


export const stompClient = new Client({
  brokerURL: `ws://localhost:8080/ws/websocket`,
  onConnect: () => {
    console.log('Connected to websocket');
  },
  onDisconnect: () => {
    console.log('Disconnected from webscoket');
  },
  debug: (msg) => {
    console.log(msg);
  },
});

export const connectWebsocket = () => {
  stompClient.activate();
};

export const disconnectWebsocket = () => {
  stompClient.deactivate();
};

export const sendMessage = (message) => {
  if (stompClient.connected) {
    stompClient.publish({
      destination: '/app/sendMessage',
      body: JSON.stringify({ chat: message }),
    });
  }
};

export const  addUser = (name) => {
  if (stompClient.connected) {
    stompClient.publish({
      destination: '/app/addUser',
      body:JSON.stringify({user:name, type:'JOIN'}),
    });
  }
};
