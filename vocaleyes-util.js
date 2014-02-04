  // file vocaleyes-util.js
  // oauthor  Nicholas Vitovitch <ngvitovitch@gmail.com>
  // brief  Utility functions used by the VocalEyes application

  // function VEUtil_RandomChars
  // brief  returns a string of the specified length containing random chars
  var VEUtil_RandomChars = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  // function VEUtil_GoogleTTS
  // brief  Uses HTML5 audio elements and Google Translate's TTS services to
  //        speak the given string.
  // desc   The given string is broken down into bite-sized pieces (at 
  //        sentences, comma breaks, 100 chars) and played one after the other.
  var VEUtil_GoogleTTS = function(string) {
    var text = string.trim().replace(/(\'|\")/,""); // strip ' and "
    var split_text = text.split(/(\.+|\,)/); // split on ',' '.' '...'

    // build up tts queue
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

    // google interface function
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