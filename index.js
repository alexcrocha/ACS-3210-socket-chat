const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  socket.on('nickname', (nickname) => {
    socket.nickname = nickname;
    io.emit('chat message', { nickname: 'Server', message: `${nickname} has joined the chat!` });
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    io.emit('chat message', { nickname: 'Server', message: `${socket.nickname} has left the chat!` });
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
