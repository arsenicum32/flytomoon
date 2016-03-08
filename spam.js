var unirest = require('unirest');
var _ = require('underscore');

function getp(text, callback){
  var VKsendQ =
  {
    "id": "323284220",
    //"323284220",  джексон поллок
    "access_token": "6d5d992a76a6cd0d9950613701b881b69dd2390dab723bf0a8b0e201a44a987ec630703a6ecb3b646eea0",
    //"6d5d992a76a6cd0d9950613701b881b69dd2390dab723bf0a8b0e201a44a987ec630703a6ecb3b646eea0",
    "q": text,
    "v": "5.45"
  };
  unirest.get('https://api.vk.com/method/execute.getpublic')
  .query(VKsendQ)
  .end(function(res) {
    if (res.error) {
      callback(res.error);
    } else {
      callback(res.body);
    }
  });
}


var variable = process.argv[ process.argv.length - 1 ];
if(_.isNaN(parseInt(variable))){
  getp(variable, function(t){
     var publ = t.response;
    //  for(var n in publ){
    //    console.log('http://vk.com/public' + (publ[n]).toString().substring(1) );
    //  }
     var index = 0;
     var yet = 0;
     var inter = setInterval( function(){
       console.log(Math.floor(Math.random()*1000));
       if(index<publ.length){
         if(Math.floor(Math.random()*1000)>950){
           index++;
           yet = 1;
         }
       }else{
         clearInterval(inter);
       }
       if(yet){
         yet=0;
          sendNotice( publ[index], function(t){
            console.log('http://vk.com/public' + (publ[index]).toString().substring(1) );
            console.log(t);
          });
       }
     }, 500);
  })
}else{
  sendNotice( process.argv[ process.argv.length - 1 ], function(t){
    console.log(t);
  })
}


function sendNotice(text, callback){
  var VKsendQ =
  {
    "id": "343538344",
    //"343537917", суперанна
    //"343536964", суперпароль
    //"323284220",  джексон поллок
    "access_token": "a0c6e1d928c6dd71bb78f65182a1883bea4158ec2708b31f8186c84d483a1f5a2c862d74c2bce33108576",
    //"e120ff90842d2c488787b12a7081e8f720799794d235da86bd791993cb2961b8bcd0578891be73522f2da", суперанна
    //"5c7731378db91ece29ab08fe3b8fb9665c754cb67565dee416183aea952b3d14afdf60082865fc52fa273", суперпароль
    //"6d5d992a76a6cd0d9950613701b881b69dd2390dab723bf0a8b0e201a44a987ec630703a6ecb3b646eea0",
    "group": text,
    "v": "5.45"
  };
  unirest.get('https://api.vk.com/method/execute.spam')
  .query(VKsendQ)
  .end(function(res) {
    if (res.error) {
      callback( res.error );
    } else {
      callback( res.body );
    }
  });
}
// setInterval(function(){
//   console.log(sendNotice(rand));
// }, 5890);
