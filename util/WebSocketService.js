// src/services/WebSocketService.js

import { io } from 'socket.io-client';

const socket = io('http://192.168.20.3:3000/cable');

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

// Other event handlers, disconnection logic, etc.

export default socket;
