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