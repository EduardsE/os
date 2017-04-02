(function ($, window, document, undefined) {

  'use strict';

  window.original_data = [1, 2, 3, 4];
  window.healthy_hard_drives = [];

  function drawRaid_0() {
    var data_array = $(".main .data")
    var data_items = $(".main .data").find(".data-item")
    var hard_drives = $(".hard-drive")
    window.healthy_hard_drives = Array(hard_drives.length).fill(0).map(function(v, i) { return i; });

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
    window.healthy_hard_drives = Array(hard_drives.length).fill(0).map(function(v, i) { return i; });

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


  function drawRaid_5() {
    var data_array = $(".main .data")
    var data_items = $(".main .data").find(".data-item")
    var hard_drives = $(".hard-drive")
    window.healthy_hard_drives = Array(hard_drives.length).fill(0).map(function(v, i) { return i; });

    var data = window.original_data.concat(window.original_data);
    data = shuffle(data)

    $(hard_drives).each(function(index, drive) {
      var first_data_element = data.splice(0, 1);
      var second_data_element = data.splice(0, 1);

      while (first_data_element[0] == second_data_element[0]) {
        data.push(second_data_element);
        second_data_element = data.splice(0, 1);
      }

      if (data.length == 2 && data[0] == data[1]) {
        data[0] = second_data_element
        second_data_element = data[1]
      }

      $(data_items[0]).clone().text(first_data_element).appendTo($(hard_drives[index]))
      $(data_items[0]).clone().text(second_data_element).appendTo($(hard_drives[index]))

    });
  };


  function drawRaid_6() {
    var data_array = $(".main .data")
    var data_items = $(".main .data").find(".data-item")
    var hard_drives = $(".hard-drive")
    window.healthy_hard_drives = Array(hard_drives.length).fill(0).map(function(v, i) { return i; });

    var data = window.original_data.concat(window.original_data).concat(window.original_data);
    data = shuffle(data)

    var arrays_good = false

    var complete_data_array;
    while(!arrays_good) {
      complete_data_array = [[], [], [], []]
      data.forEach(function(value, index) {
        complete_data_array[index%4].push(value)
      });
      data = shuffle(data);
      arrays_good = checkIfAllArraysGood(complete_data_array);
    }

    $(hard_drives).each(function(index, drive_el) {

      complete_data_array[index%4].forEach(function (el) {
        $(data_items[0]).clone().text(el).appendTo($(hard_drives[index]))
      });
    })
  };

  function checkIfAllArraysGood(array) {
    if (array[0].length == 0) {
      return false;
    }

    var result = true
    array.forEach(function (subarray) {
      if (!checkIfDifferent(subarray[0], subarray[1], subarray[2])) {
        result = false;
      }
    });

    return result;
  }

  function checkIfDifferent(val1, val2, val3) {
    return (val1 != val2 && val2 != val3 && val1 != val3)
  }

  function drawRaid_10() {
    var data_array = $(".main .data")
    var data_items = $(".main .data").find(".data-item")
    var hard_drives = $(".hard-drive")
    window.healthy_hard_drives = Array(hard_drives.length).fill(0).map(function(v, i) { return i; });

    var items_first_half = $(data_items).slice(0, data_items.length/2)
    var items_second_half = $(data_items).slice(data_items.length/2)

    items_first_half.clone().appendTo($($(hard_drives)[0]))
    items_second_half.clone().appendTo($($(hard_drives)[1]))
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
    window.healthy_hard_drives = window.healthy_hard_drives.filter(function(v, i) { return i !== random_num; });

    $(hard_drives[hard_drive_to_fail]).addClass("failed")
  }


  function reset() {
    var hard_drive = $(".hard-drive")[0]
    var container = $(hard_drive).parent(".container")
    var clone = $(hard_drive).clone()

    $(container).empty();
    $(".description div").removeClass('active');
    switch ($(".raid-select").val()) {
      case "raid_0":
        for (var i=0; i<2; i++) {
          clone = $(hard_drive).clone()
          clone.appendTo(container);
        }

        $(".description .raid_0").addClass('active')
        break;
      case "raid_1":
        for (var i=0; i<2; i++) {
          clone = $(hard_drive).clone()
          clone.appendTo(container);
        }

        $(".description .raid_1").addClass('active')
        break;

      case "raid_5":
        for (var i=0; i<4; i++) {
          clone = $(hard_drive).clone()
          clone.appendTo(container);
        }

        $(".description .raid_5").addClass('active')
        $(container).addClass("raid_5")
        break;

      case "raid_6":
        for (var i=0; i<4; i++) {
          clone = $(hard_drive).clone()
          clone.appendTo(container);
        }

        $(".description .raid_6").addClass('active')
        $(container).addClass("raid_5")
        break;

      case "raid_10":
        for (var i=0; i<4; i++) {
          clone = $(hard_drive).clone()
          clone.appendTo(container);
        }

        $(".description .raid_10").addClass('active')
        $(container).addClass("raid_10")
        break;

    }

    $('.hard-drive').removeClass("failed")
    $('.hard-drive').removeClass("healthy")
    $('.message').removeClass("visible error success")
    $(".hard-drive").find(".data-item").remove()

    $('main').removeClass("raid_0")
    $('main').removeClass("raid_1")
    $('main').removeClass("raid_5")
    $('main').removeClass("raid_6")
    $('main').removeClass("raid_10")

    disableButtons(['write-data']);


    window.healthy_hard_drives = []
  }


  function disableButtons(available_classes) {
    $('a.button').attr('disabled', true);
    available_classes.forEach(function(el) {
      $('a.button.'+el).attr('disabled', false);
    })
  }


  function paintHealthyGreen() {
    for (var j = 0; j < window.healthy_hard_drives.length; j++) {
      $($('.hard-drive')[window.healthy_hard_drives[j]]).addClass("healthy")
    }
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
      }
      paintHealthyGreen();
      return;
    }

    if ($(".raid-select").val() == "raid_1") {
      paintHealthyGreen();
      displayMessage('success');
      return
    }


    if ($(".raid-select").val() == "raid_5" || $(".raid-select").val() == "raid_10" || $(".raid-select").val() == "raid_6") {
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

        $('.hard-drive.healthy').find('.data-item').each(function(index, element) {
          var num_value = parseInt($(element).text());
          if (data.indexOf(num_value) != -1) {
            data.splice(data.indexOf(num_value), 1);
            $(element).addClass("usable");
          }
        })

      } else {
        displayMessage("error");
      }

      return
    }
  }

  var startDrawing = function () {
    $('.main').addClass($(".raid-select").val());

    switch ($(".raid-select").val()) {
      case "raid_0":
        drawRaid_0();
        break;
      case "raid_1":
        drawRaid_1();
        break;
      case "raid_5":
        drawRaid_5();
        break;
      case "raid_6":
        drawRaid_6();
        break;
      case "raid_10":
        drawRaid_10();
        break;
    }

    disableButtons(['reset', 'hard-drive-failure', 'read-data'])
  }

  /**
   * Shuffles array in place.
   * @param {Array} a items The array containing the items.
   */
  var shuffle = function (a) {
    var j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }

    return a;
  }


  $(function () {
    $('.write-data.button').click(function() {
      $(".hard-drive .data-item").remove();
      startDrawing()
    })

    $('.hard-drive-failure.button').click(function() {
      failHardDrive()
    })

    $('.reset.button').click(function() {
      reset()
    })

    $('.read-data.button').click(function() {
      readData();
      disableButtons(['reset'])
    })

    $('.help-button').click(function() {
      $('.info-overlay').toggleClass('active')
    })

    $('.close-button').click(function() {
       $('.info-overlay').removeClass('active')
    })

    $( ".raid-select").change(function() {
      reset();
    });


    reset();
  });

})(jQuery, window, document);
