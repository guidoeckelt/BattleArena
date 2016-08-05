var KeyBinding = (function () {

// private static var

// Constructor
    var ctor = function (keyCombinationValue, callbacksValue) {
        var self = this; // prevents overlaping this-context

// private var
        var keyCombination = keyCombinationValue;
        var callbacks = callbacksValue;

// public instance only

// Getters & Setters
        self.getKeyCombination = function(){ return keyCombination; };
        self.setKeyCombination = function (value)  { keyCombination = value; };

        self.getCallbacks = function(){ return callbacks; };
        self.setCallbacks = function (value)  { callbacks = value; };
    };

// public static

// public shared
    ctor.prototype = {

    };

//  Inheritance
//  inherit(ctor, SuperClass);
    return ctor;
})();