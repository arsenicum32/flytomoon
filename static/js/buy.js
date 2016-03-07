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

$('#makeorder').on('click', function(){
  $('#title').html('СПАСИБО!');
  if(name&&phone&&packag)
  $.get('/neworder?m='+name+'_'+phone+'_'+packag, function(data){
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
