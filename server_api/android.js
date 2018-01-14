const express = require('express');
const app = express();

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


app.get('/users', (req, res) => {
   console.log('who get in here/users');
   res.json(users)
});

app.post('/posted', (req, res) => {
   console.log('who get in here post /users');
   var inputData;

   req.on('data', (data) => {
     inputData = JSON.parse(data);
   });

   req.on('end', () => {
     console.log("user_id : "+inputData.user_id + " , name : "+inputData.name);
   });

   res.write("OK!");
   res.end();
});

app.use(express.static('public'));


app.listen(7088, () => {
  console.log('Example app listening on port 7088!');
});


