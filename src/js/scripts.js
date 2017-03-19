(function ($, window, document, undefined) {

  'use strict';



  window.original_data = [1, 2, 3, 4];
  window.healthy_hard_drives = [];

  function drawRaid_0() {
    var data_array = $(".main .data")
    var data_items = $(".main .data").find(".data-item")
    var hard_drives = $(".hard-drive")
    window.healthy_hard_drives = Array(hard_drives.length).fill(0).map((v, i) => i);

    for (var i = 0; i < data_items.length; i++) {
      var single_data = data_items[i];
      var cloned_data = $(data_items[i]).clone()

      $(cloned_data).appendTo($($(".hard-drive")[i%2]))
    }
  }


  function drawRaid_1() {
    var data_array = $(".main .data")
    var data_items = $(".main .data").find(".data-item")
    var hard_drives = $(".hard-drive")
    window.healthy_hard_drives = Array(hard_drives.length).fill(0).map((v, i) => i);

    for (var i = 0; i < data_items.length; i++) {
      var single_data = data_items[i];
      var cloned_data;

      for (var j = 0; j < hard_drives.length; j++) {
        var hard_drive = hard_drives[j];
        cloned_data = $(data_items[i]).clone()
        $(cloned_data).appendTo(hard_drives[j]);
      }

    }
  }


  function drawRaid_10() {
    var data_array = $(".main .data")
    var data_items = $(".main .data").find(".data-item")
    var hard_drives = $(".hard-drive")
    window.healthy_hard_drives = Array(hard_drives.length).fill(0).map((v, i) => i);

    var items_first_half = $(data_items).slice(0, data_items.length/2)
    var items_second_half = $(data_items).slice(data_items.length/2)



    items_first_half.appendTo($($(hard_drives)[0]))
    items_second_half.appendTo($($(hard_drives)[1]))
    items_first_half.clone().appendTo($($(hard_drives)[2]))
    items_second_half.clone().appendTo($($(hard_drives)[3]))
  }


  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  function failHardDrive() {
    var hard_drives = $(".hard-drive")
    var hard_drive_amount = $(hard_drives).length
    var random_num = getRandomIntInclusive(0, window.healthy_hard_drives.length-1)
    var hard_drive_to_fail = window.healthy_hard_drives[random_num];
    window.healthy_hard_drives = window.healthy_hard_drives.filter((v, i) => i !== random_num);

    $(hard_drives[hard_drive_to_fail]).addClass("failed")
  }


  function reset() {
    var hard_drive = $(".hard-drive")[0]
    var container = $(hard_drive).parent(".container")
    var clone = $(hard_drive).clone()

    $(container).empty();
    switch ($(".raid-select").val()) {
      case "raid_0":
        for (var i=0; i<2; i++) {
          clone = $(hard_drive).clone()
          clone.appendTo(container);
        }

        return;
      case "raid_1":
        for (var i=0; i<2; i++) {
          clone = $(hard_drive).clone()
          clone.appendTo(container);
        }

        return;
      case "raid_10":
        for (var i=0; i<4; i++) {
          clone = $(hard_drive).clone()
          clone.appendTo(container);
        }

        $(container).addClass("raid_10")
        return;

    }

    var hard_drives = $(".hard-drive")
    $(hard_drives).removeClass("failed")
    $(hard_drives).removeClass("healthy")
    $('.message').removeClass("visible error success")
    $(".hard-drive").find(".data-item").remove()

    window.healthy_hard_drives = []
  }


  function paintHealthyGreen() {
    for (var j = 0; j < window.healthy_hard_drives.length; j++) {
      $($('.hard-drive')[window.healthy_hard_drives[j]]).addClass("healthy")
    }

    $(".message").addClass("visible success");
    $(".message").text("Data successfully read.")
  }


  function displayMessage(css_class) {
    if (css_class == "success") {
      var message = "Data successfully read.";
    } else {
      var message = "Impossible to read data, cause of too much hard drive failures.";
    }

    $(".message").removeClass("success error")
    $(".message").text(message);
    $(".message").addClass("visible " + css_class);
  }

  function readData() {
    if ($(".hard-drive .data-item").length == 0) {
      return;
    }

    if (window.healthy_hard_drives.length == 0) {
      displayMessage('error');
      return;
    }

    if ($(".raid-select").val() == "raid_0") {
      if ($(".hard-drive").length > window.healthy_hard_drives.length) {
        displayMessage('error');
      } else {
        displayMessage('success');
        paintHealthyGreen();
      }
      return;
    }

    if ($(".raid-select").val() == "raid_1") {
      paintHealthyGreen();
      return
    }

    if ($(".raid-select").val() == "raid_10") {
      paintHealthyGreen();

      var data = [];
      $('.hard-drive').each(function(i, v) {
        if ($($(v)[0]).hasClass("healthy")) {
          $(v).find('.data-item').each(function(index, value) {
            var numeric_value = parseInt($(value).html())

            if (data.indexOf(numeric_value) == -1) {
              data.push(parseInt(numeric_value));
            }
          })
        }
      });

      data.sort(function(a, b) {
        return a - b;
      })

      var matches = true;
      if (data.length == window.original_data.length) {
        data.forEach(function(v, i){
          if (v != window.original_data[i]) {
            matches = false
          }
        })
      } else {
        matches = false
      }

      if (matches) {
        displayMessage("success");
      } else {
        displayMessage("error");
      }

      return
    }
  }

  var startDrawing = function () {
    switch ($(".raid-select").val()) {
      case "raid_0":
        drawRaid_0();
        return;
      case "raid_1":
        drawRaid_1();
        return;
      case "raid_10":
        drawRaid_10();
        return;
    }
  }

  $(function () {
    $('.start-drawing.button').click(function() {
      $(".hard-drive .data-item").remove();
      startDrawing()
    })

    $('.hard-drive-failure.button').click(function() {
      failHardDrive()
    })

    $('.reset-failures.button').click(function() {
      reset()
    })

    $('.read-data.button').click(function() {
      readData()
    })

    $( ".raid-select").change(function() {
      reset();
    });

    // reset();
  });

})(jQuery, window, document);
