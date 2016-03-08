var unirest = require('unirest');

function sendNotice(text){
  var VKsendQ =
  {
    "id": "157869096",
    //"323284220",  джексон поллок
    "access_token": "321d139160cb582033428c8643dc3f86430b01c676b149f448015f1c98708b589a3e4f35e0434fa8c5eef",
    //"6d5d992a76a6cd0d9950613701b881b69dd2390dab723bf0a8b0e201a44a987ec630703a6ecb3b646eea0",
    "group": text,
    "v": "5.45"
  };
  unirest.get('https://api.vk.com/method/execute.spam')
  .query(VKsendQ)
  .end(function(res) {
    if (res.error) {
      console.log( res.error );
    } else {
      console.log( res.body );
    }
  });
}

var rand = function(){
  return '-'+Math.floor( Math.random()*100000000 );
}
setInterval(function(){
  console.log(sendNotice(rand));
}, 5890);
