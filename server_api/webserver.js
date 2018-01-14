var express = require('express');
var app = express();

var server = http.createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(socket){ //on event 발생 대기 
    //programming here
});



app.use(express.static('test')); 
// localhost:3000으로 서버에 접속하면 클라이언트로 index.html을 전송한다
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });
  

  server.listen(3000, function() {
    console.log('Socket IO server listening on port 3000');
  });

  // connection이 수립되면 event handler function의 인자로 socket이 들어온다
io.on('connection', function(socket) {
      
    // 접속한 클라이언트의 정보가 수신되면

    socket.on('login', function(data) {
        console.log('Client logged-in:\n name:' + data.name + '\n userid: ' + data.userid);
    
        // socket에 클라이언트 정보를 저장한다
        socket.name = data.name;
        socket.userid = data.userid;
    
        // 접속된 모든 클라이언트에게 메시지를 전송한다
        io.emit('login', data.name );

    });
});

// 클라이언트로부터의 메시지가 수신되면
socket.on('chat', function(data) {
    console.log('Message from %s: %s', socket.name, data.msg);

    var msg = {
      from: {
        name: socket.name,
        userid: socket.userid
      },
      msg: data.msg
    };
});