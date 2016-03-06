(function(){
  var moons = '🌑🌒🌓🌔🌕🌝🌕🌖🌗🌘🌑🌚'; //'🌌';
  var timer = 0;
  var inter = setInterval( function(){
    timer<moons.length?timer++:timer=0;
    if(moons.substring( timer-1 , timer+1).length){
      $('#logotype').html(moons.substring( timer-1 , timer+1));
    }
  } , 900);
})();
