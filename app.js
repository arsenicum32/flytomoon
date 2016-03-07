var express = require('express');
var cors = require('cors');
var fs = require('fs');
var unirest = require('unirest');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var currentname;
var clients = {};

var users = 0;
var maxusers = 0;
var srusers = 0;
var visitorsall = 0;
var session = 0;
var arraylinks = {};

app.use('/', express.static(__dirname + '/static'));
app.use(cors());

app.get('/neworder', function(req,res,next){
  if(req.query.m){
    sendNotice(res, req.query.m);
  }else{
    res.json({error: "no param m"});
  }
});

app.get('/reset', function(req,res,next){
  users = 0;
  maxusers = 0;
  srusers = 0;
  visitorsall = 0;
  session = 0;
  arraylinks = {};
  res.json({suka:"бля пиздец я заебался кодить"});
});

app.get('/statistic', function(req,res,next){
  res.json({
    visnum: visitorsall,
    maxusers: maxusers,
    online: users,
    sessionlength: Math.floor(session/visitorsall) ,
    visitorsfromlink: arraylinks,
    detals: clients,
  });
});

app.get('/thanks', function(req,res,next){
  res.sendFile(__dirname + '/thanks.html');
})

app.get('/', function(req, res, next){
  res.sendFile(__dirname + '/index.html');
});



testroom = io.of('/test');

testroom.on('connection', function(socket){
  users++;visitorsall++;
  if(users>maxusers) maxusers = users;
  currentname = (new Date()).getTime();
  clients[socket.id] = (new Date()).getTime();

  //fixclients();

  var currentfile =  __dirname + '/vis/test.txt';
  //writelog( currentfile , 'newsession: '+socket.id+', time: '+ (new Date()).getTime() );

  socket.on('myid', function(msg){
    testroom.emit('yourid', {s: msg, id: socket.id });
  });

  socket.on('link', function(msg){
    if(arraylinks.hasOwnProperty(msg)){
      arraylinks[msg]++;
    }else{
      arraylinks[msg]=1;
    }
  });

  socket.on('start', function(msg){
    console.log('start: '+msg);
    //writelog( currentfile, msg);
    //testroom.emit('getdata', msg );
  });

  socket.on('click', function(msg){
    //writelog( currentfile, 'click to obj: '+msg+' from '+socket.id);
  });
  socket.on('disconnect', function(){
    if(clients[socket.id]) delete clients[socket.id];
    //fixclients();
    users--;
    session = (new Date()).getTime() - currentname;
  })
});

http.listen(8000, function(){
  console.log('listening on *:3000');
});

// function writelog( file, data ){
//   if(file&&data){
//     fs.appendFile( file ,  data+"\n", 'utf8' , function(err){
//                 if (err){
//                   console.log('no file??? '+err);
//                 }
//               });
//   }else{
//     console.log('no data or file');
//   }
// }
//
// function fixclients(){
//   if(true){
//     fs.appendFile( __dirname + '/vis/visitors.txt' , JSON.stringify( clients )+"\n" , 'utf8' , function(err){
//                 if (err){
//                   console.log('no file??? '+err);
//                 }
//               });
//   }else{
//     console.log('no data or file');
//   }
// }

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
