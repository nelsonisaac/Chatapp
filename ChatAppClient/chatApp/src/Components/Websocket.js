// import { Client } from '@stomp/stompjs';

// const stompClient = new Client({
//   brokerURL: `ws://localhost:8080/ws/websocket`,
//   onConnect: () => {
//     console.log('Connected to websocket');
//     if (stompClient.connected) {
//         stompClient.subscribe('/topic/public', (message) => {
//             const data = JSON.parse(message.body);
//             console.log("Received message:", data);
//         });
//       }
//   },
//   onDisconnect: () => {
//     console.log('Disconnected from webscoket');
//   },
//   debug: (msg) => {
//     console.log(msg);
//   },
// });

// export const connectWebsocket = () => {
//   stompClient.activate();
// };

// export const disconnectWebsocket = () => {
//   stompClient.deactivate();
// };

// export const sendMessage = (message) => {
//   if (stompClient.connected) {
//     stompClient.publish({
//       destination: '/app/sendMessage',
//       body: JSON.stringify({ chat: message }),
//     });
//   }
// };

// export const subscribeToMessages = (callback) => {
//   if (stompClient.connected) {
//     stompClient.subscribe('/topic/public', (message) => {
//         const data = JSON.parse(message.body);
//         console.log(data);
//       //callback(JSON.parse(message.body));
//     });
//   }
// };
