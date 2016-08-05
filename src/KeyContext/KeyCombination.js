var KeyCombination = (function(){

// private static var

// Constructor
    var ctor = function (keyValue,specialKeys) {
        var self = this; // prevents overlaping this-context

// private var
        var key = keyValue;
        var specialKeys = specialKeys;
        var hasSpecialKeys = null != specialKeys;

// public instance only

// Getters & Setters
        self.getKey = function(){ return key; };
        self.setKey = function (value)  { key = value; };

        self.getSpecialKeys = function(){ return specialKeys; };
        self.setSpecialKeys = function (value)  {
            specialKeys = value;
            hasSpecialKeys = null != specialKeys;
        };

        self.getHasSpecialKeys = function(){ return hasSpecialKeys; };
    };

// public static

// public shared
    ctor.prototype = {

    };

//  Inheritance
//  inherit(ctor, SuperClass);
    return ctor;
})();