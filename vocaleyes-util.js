  // Utility Functions, etc.
  var VEUtil_RandomChars = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  var VEUtil_GoogleTTS = function(string) {
    var text = string.trim().replace(/(\'|\")/,"");
    var split_text = text.split(/(\.+|\,)/); // split on ',' '.' '...'

    var tts_queue = [];
    for (var i = 0; i < split_text.length; i+=2) {
      remainder = split_text[i];
      var waitTime = i == 0 ? 0 : 0;
      while(remainder.length > 0) {
        if(remainder.length > 100) {
          var breakCandidate = remainder.substr(0,100).lastIndexOf(' ');
          if(breakCandidate == -1) breakCandidate = 100;
          tts_queue.push(remainder.substr(0,breakCandidate).trim());
          remainder = remainder.substr(breakCandidate);
        } else {
          tts_queue.push(remainder.trim());
          remainder = "";
        }
        waitTime = 0;
      }
    }

    var tts_shift_say = function() {
      var tts_text = tts_queue.shift();
      if(tts_text == undefined) return;

      var language = "en";
      var url = "http://www.translate.google.com/translate_tts?tl=" + language + "&q=" + tts_text;
      var id = "audio-" + VEUtil_RandomChars(5);

      $("body").append("<audio autoplay id='" + id + "'><source src='" + url + "' type='audio/mpeg'></audio>");

      $("#" + id).on('error', function(e) {
        console.log("An Error Occurred!");
        $("#" + id).remove();
      });
      $("#" + id).on('ended', function() {
        $("#" + id).remove();
        tts_shift_say();
      });
    }

    tts_shift_say();
  }