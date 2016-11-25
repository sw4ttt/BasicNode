var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
    socket.join('001');
    socket.on('chat message', function(data){
        //io.emit('chat message', msg);
        io.to(data.room).emit('chat message', data.msg);
    });
    //io.emit('user connected', "*Server: User connected.");
    io.to('001').emit('user connected', "*Server: User connected.");

    socket.on('disconnect', function(){
        //io.emit('user disconnect', "*Server: User disconnected.");
        io.to('001').emit('user disconnect', "*Server: User disconnected.");
    });
    socket.on('user typped', function(msg){
        //io.emit('user typped', msg);
        io.to('001').emit('user typped', msg);
    });
    //var clients = io.sockets.clients('room');
    //console.log(clients);  

    //var socketClients = Object.keys(io.sockets.adapter.rooms["ROOM_NAME"].sockets);
    /*Object.keys(io.sockets.sockets).forEach(function(id) 
    {
        console.log("ID:",id)  // socketId
    })*/

    var usersInRoom = 0;
    Object.keys(io.sockets.adapter.rooms["001"].sockets).forEach(function(id) 
    {
        usersInRoom++;
    })
    io.to('001').emit('users', usersInRoom.toString());
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});