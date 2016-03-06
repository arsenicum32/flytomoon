$('.buy').on('mouseover', function(){
  $(this).css('z-index', $(this).attr('zindex')+10);
});

$('.buy').on('mouseout', function(){
  $(this).css('z-index', $(this).attr('zindex'));
});

$('.order').on('click' , function(){
  $(this).parent().append('<input placeholder="Василий" /><input placeholder="+79654768745"/><a href="#" id="makeorder">заказать</a>');
  $(this).remove();
  $('#makeorder').on('click', function(){
    $('#title').html('СПАСИБО!');
  });
});
