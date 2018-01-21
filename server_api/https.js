var http = require('http'),  
express = require('express');
var bodyParser = require('body-parser')


var port = 3000;  
var app = express();  

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




var server = http.createServer(app).listen(port, function(){  
console.log("Http server listening on port " + port);
});




app.get('/', function (req, res) {  
res.writeHead(200, {'Content-Type' : 'text/html'});
res.write('<h3>Welcome</h3>');
res.write('<a href="/login">Please login</a>');
res.end();
});

app.get('/login', function (req, res){  
res.writeHead(200, {'Content-Type': 'text/html'});
res.write('<h3>Login</h3>');
res.write('<form method="POST" action="/login">');
res.write('<label name="userId">UserId : </label>')
res.write('<input type="text" name="userId"><br/>');
res.write('<label name="password">Password : </label>')
res.write('<input type="password" name="password"><br/>');
res.write('<input type="submit" name="login" value="Login">');
res.write('</form>');
res.end();
})

app.post('/login', function (req, res){  
var userId = req.params.userId;
var password = req.params.password;

res.writeHead(200, {'Content-Type': 'text/html'});
res.write('Thank you, '+userId+', you are now logged in.');
res.write('<p><a href="/"> back home</a>');
res.end();
});
