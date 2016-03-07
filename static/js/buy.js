$('.buy').on('mouseover', function(){
  $(this).css('z-index', $(this).attr('zindex')+10);
});

$('.buy').on('mouseout', function(){
  $(this).css('z-index', $(this).attr('zindex'));
});

var name,phone, packag;

$('.order').on('click' , function(){
  packag = $(this).parent().attr('pack');
  $('#buypanel').show(500);
  $('#buypanel').find('p').text(packag);
});

$("#inname").on('input', function(){
  name = $(this).val();
});
$("#inphone").on('input', function(){
  phone = $(this).val();
});

function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

$('#makeorder').on('click', function(){
  $('#title').html('СПАСИБО!');
  if(name&&phone&&packag)
  $.get('/neworder?m='+name+'_'+phone+'_'+packag+( getQueryVariable('text')?'_link:_'+getQueryVariable('text'):'') , function(data){
    console.log(data);
    window.location.href = '/thanks';
  })
});

$('#buypanel').hide();

$('#buypanel').on({
  'mouseover': function(){
    mousePOSOV = 0;
  },
  'mouseleave': function(){
    mousePOSOV = 1;
    $('#buypanel').hide(500);
  }
});
