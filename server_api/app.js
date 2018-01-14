var express = require('express'); 
var app = express(); 
var server = require('http').createServer(app);
// http server를 socket.io server로 upgrade한다
var io = require('socket.io')(server);

var bodyParser = require('body-parser'); 
var multer = require('multer'); 
//시작 A , 종료 B

let users = [
    {
      id: 1,
      name: 'alice'
    },
    {
      id: 2,
      name: 'bek'
    },
    {
      id: 3,
      name: 'chris'
    }
  ]

  let init = 'B' 


server.listen(7088, function() {
    console.log('Socket IO server listening on port 7088');
  });
// localhost:3000으로 서버에 접속하면 클라이언트로 index.html을 전송한다
/*
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
    
    
});
*/

app.use(express.static('public'));


app.get('/route.jpg', function(req,res){
    res.send('<img src="/images/route.jpeg">')
});
 

app.get('/test',function(req,res)
{
    // 템플릿 엔진의 소스코드를 가지고 와서 웹페이지를 만들어 내는 res 객체의 메소드
    res.sendFile(__dirname + '/client.html'); 
});
    /*-------------------socket 통신----------*/

// connection event handler
// connection이 수립되면 event handler function의 인자로 socket이 들어온다
app.post('/posted', (req, res) => {
    console.log('who get in here post /users');
    var inputData;
 
    req.on('data', (data) => {
      inputData = JSON.parse(data); //데이터 수집 
    });
 
    req.on('end', () => { //붙이기 
      console.log("user_id : "+inputData.user_id + " , name : "+inputData.name);
      console.log(inputData.user_id);

      
      
    });

      /*-------서버에서 웹 클라이언트로 전송 ---------*/

    res.write("OK!"); //서버로 값이 넘어 왔다는 의미 
    
    res.end(); //응답 프로세스 종료
    
     
 
 });


 
 io.on('connect', function(socket) {     
   
    
socket.emit('news', { hello: 'world' });
    
 socket.on('newsis', function (data) {
    console.log(data);

    app.post('/users', (req, res) => {
        console.log('who get in here/users');
        res.json(init)
     });  


  //클라이언트에서 앱으로 보내는 거
});   
 

 //이벤트명 key값 value 
        

});

    
  
    
 
         


 
      


   


    // 접속한 클라이언트의 정보가 수신되면
/*  socket.on('login', function(data) {
    console.log('Client logged-in:\n name:' + data.name + '\n userid: ' + data.userid);

    // socket에 클라이언트 정보를 저장한다
    socket.name = data.name;
    socket.userid = data.userid;

    // 접속된 모든 클라이언트에게 메시지를 전송한다
    io.emit('login', data.name );

    });

    socket.on('chat', function(data) {
        console.log('Message from %s: %s', socket.name, data.msg);
    
        var msg = {
          from: {
            name: socket.name,
            userid: socket.userid
          },
          msg: data.msg
        };
        
        // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    socket.broadcast.emit('chat', msg);
*/
   
    /*-------------------업로드----------*/

var _storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null,'uploads/')
    }, 
    filename: function(req, file, cb){
        cb(null,file.originalname); 
    }
})

var upload = multer({storage : _storage})
 
var fs = require('fs'); 

app.use(bodyParser.urlencoded({extended:false})); 
app.locals.pretty = true; 

app.set('view engine','jade'); 
// 사용할 view engine을 express에게 알려주는 코드
// express 프레임워크와 jade 엔진을 연결!
app.set('views', './views_file'); 
// 템플릿이 있는 디렉토리를 express에게 알려주는 코드 (생략가능, 디폴트 경로 ./views)
//app.use(express.static('public')); //정적 파일 디렉토리에 존재하는 html css를 띄우도록 한다.
// 템플릿 엔진의 소스코드를 가지고 와서 웹페이지를 만들어 내는 res 객체의 메소드
app.get('/upload',function(req,res)
{

    // 템플릿 엔진의 소스코드를 가지고 와서 웹페이지를 만들어 내는 res 객체의 메소드
    res.render('upload'); 
});

app.post('/upload',upload.single('userfile'),function(req,res)
{
    console.log(req.file); 
    res.send('uploaded : '+req.filename);  
}); 
