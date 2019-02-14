var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.use('/public', express.static(__dirname + '/public'));

io.on('connection', function(socket){

  socket.on('test', ()=>{
      // console.log(io.sockets.clients());
  });

  socket.on('get-users', ()=>{
      socket.broadcast.emit('check-connection')
  });

  socket.on('vote', (data)=>{
      socket.broadcast.emit('vote:res', (data))
  });

  socket.on('changeScore', (data)=>{
      socket.broadcast.emit('changeScore:res', (data))
  });

  socket.on('user-connected', (data)=>{
      console.log('User ', data, ' connected.');
      socket.broadcast.emit('user-connected:res', (data))
  });
  socket.on('user-disconnected', (data)=>{
      console.log('User ', data, ' disconnected.');
      socket.broadcast.emit('user-disconnected:res', (data))
  })
  socket.on('deleteTeam', (data)=>{
      socket.broadcast.emit('deleteTeam:res', (data))
  })

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
