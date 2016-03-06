var express = require('express');
var cors = require('cors');
var fs = require('fs');
var unirest = require('unirest');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static(__dirname + '/static'));
app.use(cors());

app.get('/neworder', function(req,res,next){
  if(req.query.m){
    sendNotice(res, req.query.m);
  }else{
    res.json({error: "no param m"});
  }
});

app.get('/', function(req, res, next){
  res.sendFile(__dirname + '/index.html');
});



testroom = io.of('/test');

testroom.on('connection', function(socket){
  console.log('new client!');
  socket.on('getdata', function(msg){
    testroom.emit('getdata', msg );
  });

  socket.on('fullinfopanel', function(msg){
    fs.stat( __dirname + '/static/html/'+msg , function(err, stat){
      if(err) console.log(err);
      if(stat){
        fs.readFile( __dirname + '/static/html/'+msg , function(err, data){
          if (err) console.log(err);
          testroom.emit('fullinfopanel', data.toString('utf8') );
        });
      }
    });
  });
});

http.listen(8000, function(){
  console.log('listening on *:3000');
});


function sendNotice(response, text){
  var VKsendQ =
  {
    "id": "210149434",
    //"323284220",  джексон поллок
    "access_token": "68803d960156183ff9e2fb1ba7831427c49ebdb1dda672f542173ffd283b78374d7ad11391c8759b9d96e",
    //"6d5d992a76a6cd0d9950613701b881b69dd2390dab723bf0a8b0e201a44a987ec630703a6ecb3b646eea0",
    "text": text
  };
  unirest.get('https://api.vk.com/method/execute.newOrder')
  .query(VKsendQ)
  .end(function(res) {
    if (res.error) {
      response.json( res.error );
    } else {
      response.json( res.body );
    }
  });
}
