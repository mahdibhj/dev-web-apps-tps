const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket)=> {
  console.log('New user connected');

  socket.on('disconnect',() =>{
    console.log('user disconnected');
  });

  socket.on('sendingMessageFromClient', (payload) =>{
    io.emit('broadcastMessageFromServer', payload);
  });
});

server.listen(8000, () => {
    console.log("listening on localhost:8000")
});
