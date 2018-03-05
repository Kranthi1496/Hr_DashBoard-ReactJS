const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
//creates a new socket.io instance attached to the http server.

const port = 3001;
let users = [];
//db
var mysql = require('mysql');


// Socket.io connect
io.sockets.on('connection', (socket) => {
  //
//console.log(socket);
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "aec"
  });


  socket.on('send message', function(data){
    //To broadcast an event to all the clients, we can use the io.sockets.emit method.
    console.log(data);
    var msg=data.msg;
    var sender=data.sender;
    var receiver=data.receiver;
    con.query("INSERT INTO `chat` (`sender`,`receiver`,`message`) VALUES ('"+sender+"','"+receiver+"','"+msg+"')", function (err, rows) {
       if (err) throw err;
    //  console.log("1 record inserted");
      //console.log(rows);
    getrecords();
     });
    //io.sockets.emit('show_message', {msg: msg,sender:sender, receiver: receiver});
  });

  socket.on('chathistory',function(data){
    getrecords();
  });

  function getrecords(){
    con.query("SELECT * FROM chat", function (err, rows) {
       if (err) throw err;
  //     console.log(rows);
       io.sockets.emit('show_message',rows);
     });
  }

});
server.listen(port, () => {
  console.log('Server started on port '+port);
});
