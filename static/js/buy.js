$('.buy').on('mouseover', function(){
  $(this).css('z-index', $(this).attr('zindex')+10);
});

$('.buy').on('mouseout', function(){
  $(this).css('z-index', $(this).attr('zindex'));
});

var name,phone, packag;

$('.order').on('click' , function(){
  packag = $(this).parent().attr('pack');
  $(this).parent().append('<input id="inname" placeholder="Василий" /><input id="inphone" placeholder="+79654768745"/><a href="#" id="makeorder">заказать</a>');
  $(this).remove();
  $("#inname").on('input', function(){
    name = $(this).val();
  });
  $("#inphone").on('input', function(){
    phone = $(this).val();
  })
  $('#makeorder').on('click', function(){
    $('#title').html('СПАСИБО!');
    if(name&&phone&&packag)
    $.get('/neworder?m='+name+'_'+phone+'_'+packag, function(data){
      console.log(data);
    })
  });
});
