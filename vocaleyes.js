$(document).ready(function() {
  // Utility Functions, etc.
  var VEUtil_RandomChars = function(length) {        var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
  var VEUtil_GoogleTTS = function(say) {
    var url = "http://www.translate.google.com/translate_tts?tl=en&q=" + say;
    var id = "audio-" + VEUtil_RandomChars(5);
    $("body").append("<audio autoplay id='" + id + "'><source src='" + url + "' type='audio/mpeg'></audio>");
    $("#" + id).on('ended', function() {
      $("#" + id).remove();
    })
  }
  // VocalEyes Core Logic Variables, Functions, etc.
  var VECore_KeyValPair = function(key, val) {
    this.class = "VECore_KeyValPair";
    this.key = key;
    this.val = val;
  }
  var VECore_DecisionNode = function(kvPairs) {
    this.class = "VECore_DecisionNode";
    this.decisions = kvPairs;
  }
  var VECore_ActionNode = function(func, args) {
    this.class = "VECore_ActionNode";
    this.func = func;
    this.args = args;
    this.act = function() {
      this.func.apply(this, this.args);          
    }
  }
  // Application Variables, Functions, etc.
  var wordBuilder = "";
  var sentenceBuilder = "";
  var sentenceLog = [];
  var updateInterval = 400;
  var appendCharToWB = function(char, node) {
    wordBuilder += char;
    currNode = node;
  }
  var pushWBToSB = function() {
    if(sentenceBuilder != "") {
      sentenceBuilder = sentenceBuilder.trim() + " "; // add correct WS.
    }
    sentenceBuilder += wordBuilder; // append word
    wordBuilder = "";
  }
  var appendPunct = function(char) {
    pushWBToSB();
    sentenceBuilder = sentenceBuilder.trim() + char;
  }
  var setActiveDecision = function(node) {
    currNode = node;
  }
  var saySentenceBuilder = function() {
    VEUtil_GoogleTTS(sentenceBuilder);
  }
  var clearWordBuilder = function() {
    wordBuilder = "";
  }
  var clearSentenceBuilder = function() {
    sentenceBuilder = "";
  }
  var setUpdateInterval = function(int, node) {
    updateInterval = int;
    currNode = node;
  }
  var alpha = new VECore_DecisionNode([]); // alpha is an empty Decision
  var aNode = new VECore_DecisionNode([
    new VECore_KeyValPair('a', new VECore_ActionNode(appendCharToWB, ['a', alpha])),
    new VECore_KeyValPair('b', new VECore_ActionNode(appendCharToWB, ['b', alpha])),
    new VECore_KeyValPair('c', new VECore_ActionNode(appendCharToWB, ['c', alpha])),
    new VECore_KeyValPair('d', new VECore_ActionNode(appendCharToWB, ['d', alpha])),
    new VECore_KeyValPair('back', new VECore_ActionNode(setActiveDecision, [alpha]))
  ]);
  var eNode = new VECore_DecisionNode([
    new VECore_KeyValPair('e', new VECore_ActionNode(appendCharToWB, ['e', alpha])),
    new VECore_KeyValPair('f', new VECore_ActionNode(appendCharToWB, ['f', alpha])),
    new VECore_KeyValPair('g', new VECore_ActionNode(appendCharToWB, ['g', alpha])),
    new VECore_KeyValPair('h', new VECore_ActionNode(appendCharToWB, ['h', alpha])),
    new VECore_KeyValPair('back', new VECore_ActionNode(setActiveDecision, [alpha]))
  ]);
  var iNode = new VECore_DecisionNode([
    new VECore_KeyValPair('i', new VECore_ActionNode(appendCharToWB, ['i', alpha])),
    new VECore_KeyValPair('j', new VECore_ActionNode(appendCharToWB, ['j', alpha])),
    new VECore_KeyValPair('k', new VECore_ActionNode(appendCharToWB, ['k', alpha])),
    new VECore_KeyValPair('l', new VECore_ActionNode(appendCharToWB, ['l', alpha])),
    new VECore_KeyValPair('m', new VECore_ActionNode(appendCharToWB, ['m', alpha])),
    new VECore_KeyValPair('n', new VECore_ActionNode(appendCharToWB, ['n', alpha])),
    new VECore_KeyValPair('back', new VECore_ActionNode(setActiveDecision, [alpha]))
  ]);
  var oNode = new VECore_DecisionNode([
    new VECore_KeyValPair('o', new VECore_ActionNode(appendCharToWB, ['o', alpha])),
    new VECore_KeyValPair('p', new VECore_ActionNode(appendCharToWB, ['p', alpha])),
    new VECore_KeyValPair('q', new VECore_ActionNode(appendCharToWB, ['q', alpha])),
    new VECore_KeyValPair('r', new VECore_ActionNode(appendCharToWB, ['r', alpha])),
    new VECore_KeyValPair('s', new VECore_ActionNode(appendCharToWB, ['s', alpha])),
    new VECore_KeyValPair('t', new VECore_ActionNode(appendCharToWB, ['t', alpha])),
    new VECore_KeyValPair('back', new VECore_ActionNode(setActiveDecision, [alpha]))
  ]);
  var uNode = new VECore_DecisionNode([
    new VECore_KeyValPair('u', new VECore_ActionNode(appendCharToWB, ['u', alpha])),
    new VECore_KeyValPair('v', new VECore_ActionNode(appendCharToWB, ['v', alpha])),
    new VECore_KeyValPair('w', new VECore_ActionNode(appendCharToWB, ['w', alpha])),
    new VECore_KeyValPair('x', new VECore_ActionNode(appendCharToWB, ['x', alpha])),
    new VECore_KeyValPair('y', new VECore_ActionNode(appendCharToWB, ['y', alpha])),
    new VECore_KeyValPair('z', new VECore_ActionNode(appendCharToWB, ['z', alpha])),
    new VECore_KeyValPair('back', new VECore_ActionNode(setActiveDecision, [alpha]))
  ]);
  var punctNode = new VECore_DecisionNode([
    new VECore_KeyValPair('.', new VECore_ActionNode(appendPunct, ['.', alpha])),
    new VECore_KeyValPair(',', new VECore_ActionNode(appendPunct, [',', alpha])),
    new VECore_KeyValPair('?', new VECore_ActionNode(appendPunct, ['?', alpha])),
    new VECore_KeyValPair('!', new VECore_ActionNode(appendPunct, ['!', alpha])),
    new VECore_KeyValPair('back', new VECore_ActionNode(setActiveDecision, [alpha]))
  ]);
  var speedNode = new VECore_DecisionNode([]);
  speedNode.decisions.push(new VECore_KeyValPair('V fast', new VECore_ActionNode(setUpdateInterval, [200, speedNode])));
  speedNode.decisions.push(new VECore_KeyValPair('fast', new VECore_ActionNode(setUpdateInterval, [300, speedNode])));
  speedNode.decisions.push(new VECore_KeyValPair('moderate', new VECore_ActionNode(setUpdateInterval, [400, speedNode])));
  speedNode.decisions.push(new VECore_KeyValPair('slow', new VECore_ActionNode(setUpdateInterval, [800, speedNode])));
  speedNode.decisions.push(new VECore_KeyValPair('V slow', new VECore_ActionNode(setUpdateInterval, [1600, speedNode])));
  speedNode.decisions.push(new VECore_KeyValPair('back', new VECore_ActionNode(setActiveDecision, [alpha])));
  
  var functNode = new VECore_DecisionNode([
    new VECore_KeyValPair('say', new VECore_ActionNode(saySentenceBuilder, [])),
    new VECore_KeyValPair('clear WB', new VECore_ActionNode(clearWordBuilder, [])),
    new VECore_KeyValPair('clear SB', new VECore_ActionNode(clearSentenceBuilder, [])),
    new VECore_KeyValPair('change speed', new VECore_ActionNode(setActiveDecision, [speedNode])),
    new VECore_KeyValPair('back', new VECore_ActionNode(setActiveDecision, [alpha]))
  ]);
  alpha.decisions.push(new VECore_KeyValPair('a', new VECore_ActionNode(setActiveDecision, [aNode])));
  alpha.decisions.push(new VECore_KeyValPair('e', new VECore_ActionNode(setActiveDecision, [eNode])));
  alpha.decisions.push(new VECore_KeyValPair('i', new VECore_ActionNode(setActiveDecision, [iNode])));
  alpha.decisions.push(new VECore_KeyValPair('o', new VECore_ActionNode(setActiveDecision, [oNode])));
  alpha.decisions.push(new VECore_KeyValPair('u', new VECore_ActionNode(setActiveDecision, [uNode])));
  alpha.decisions.push(new VECore_KeyValPair('_', new VECore_ActionNode(pushWBToSB, [])));
  alpha.decisions.push(new VECore_KeyValPair('!', new VECore_ActionNode(setActiveDecision, [punctNode])));
  alpha.decisions.push(new VECore_KeyValPair('<', new VECore_ActionNode(setActiveDecision, [functNode])));
  
  var currNode = alpha;
  var valueCounter = -1; // start decision cycle at the first option
  var inputEvent = function() {
    console.log("input detected!");
    var selectedDecision = currNode.decisions[valueCounter];
    
    selectedDecision.val.act();
    console.log(currNode);
    
    valueCounter = 0;
    updateInterface();
  };
  // listeners
  $('#ve-main').click(function(e) {
    inputEvent();
  });
  $('body').keypress(function(e) {
    if(e.which == 32) { // space
      inputEvent();
    }
  });
  var startTimer = function() {
    valueCounter = (valueCounter + 1) % currNode.decisions.length;
    console.log(currNode);
    console.log(valueCounter);
    updateInterface();
    setTimeout(startTimer, updateInterval);
  };
  var updateInterface = function() {
    // update decisions interface
    var userInterfaceContents = "";
    var userInterfaceNext = "";
    for (var i = currNode.decisions.length - 1; i >= 0; i--) {
      userInterfaceContents = "<td>" + currNode.decisions[i].key + "</td>" + userInterfaceContents;
      console.log(currNode.decisions[i].val);
      if(currNode.decisions[i].val.args.length > 0 && currNode.decisions[i].val.args[0].class == "VECore_DecisionNode") {
        var nextOptions = "";
        for (var j = currNode.decisions[i].val.args[0].decisions.length - 1; j >= 0; j--) {
          nextOptions = "<li>" + currNode.decisions[i].val.args[0].decisions[j].key + "</li>" + nextOptions;
        };
        userInterfaceNext = "<td><ul>" + nextOptions + "</ul></td>" + userInterfaceNext;
      } else {
        userInterfaceNext = "<td></td>" + userInterfaceNext;
      };
    };
    $("#interface").html("<tr>" + userInterfaceContents + "</tr><tr>" + userInterfaceNext + "</tr>");
    $("#interface tr:first td:nth-child(" + (valueCounter + 1) + ")").css({"font-size": "40px", "background": "green", "color": "white", "text-shadow": "0px 0px 0px #000"});
    // update word builder
    $("#word-builder").html(wordBuilder);
    // update sentence builder
    $("#sentence-builder").html(sentenceBuilder);
  };
   
  startTimer();
});
