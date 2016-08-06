var Config = (function () {

// private static var

// Contructor
    var ctor = function () {
        var self = this; // prevents overlaping this-context

// private var

// public instance only

// Getters & Setters

    };

// public static
    ctor.grid = { width: 1000,  height: 600};

    ctor.moveLeft 	= [37,  97];
    ctor.moveRight 	= [39, 100];
    ctor.moveTop 	= [38, 119];
    ctor.moveBottom = [40, 115];
    ctor.shoot 		= 32;

    ctor.calculateViewSize = function () {
        var height = 600;
        var width = 1000;

        return { width : width, height: height};
    };
// public shared
    ctor.prototype = {};

//  Inheritance
//  inherit(ctor, SuperClass);
    return ctor;
})();