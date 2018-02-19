const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
//creates a new socket.io instance attached to the http server.

const port = 3001;
let users = [];


// Socket.io connect
io.sockets.on('connection', (socket) => {
  // Set Username
  socket.on('set user', (data, callback) => {
    console.log('setting');
    if(users.indexOf(data) != -1){
      callback(false);
    } else {
      callback(true);
      socket.username = data;
      users.push(socket.username);
      updateUsers();
    }
  });

  socket.on('send message', function(data){
    //To broadcast an event to all the clients, we can use the io.sockets.emit method.
    console.log(data);
    var msg=data.msg;
    var sender=data.sender;
    var receiver=data.receiver;
    io.sockets.emit('show_message', {msg: msg,sender:sender, receiver: receiver});
  });

  //whenever we closes the tab that current user will be removed from users
  socket.on('disconnect', function(data){
    //if socket.username is empty i.e., socket.username=='' it will return
    if(!socket.username) return;
    users.splice(users.indexOf(socket.username), 1);
    updateUsers();
  });

  function updateUsers(){
    io.sockets.emit('users', users);
  }
});
server.listen(port, () => {
  console.log('Server started on port '+port);
});
