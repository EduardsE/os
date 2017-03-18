(function ($, window, document, undefined) {

  'use strict';


  function drawRaid_0() {
    var data_array = $(".main .data")
    var data_items = $(".main .data").find(".data-item")

    for (var i = 0; i < data_items.length; i++) {
      var single_data = data_items[i];
      // $(single_data).css({
      //   'position': 'absolute',
      //   'top': '300px'
      // })
      $(single_data).appendTo($('.hard-drive')).show('slow');
    }
  }


  var startAnimation = function () {
    drawRaid_0()
  }

  $(function () {
    $('.animation.button').click(function() {
      startAnimation()
    })

  });

})(jQuery, window, document);
