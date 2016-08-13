var Dimension3D = (function () {

// private static                   var privateStaticVariable = ...

// Contructor
    var ctor = function (widthValue,heightValue,depthValue) {
        var self = this; // prevents overlaping this-context

// private                          var privateVariable = ...
        var width = widthValue;
        var height = heightValue;
        var depth = depthValue;

// public instance only             self.method = function(...


// Getters & Setters                self.getVariable = function(...
        self.getWidth = function(){ return width; };
        self.getHeight = function(){ return height; };
        self.getDepth = function(){ return depth; };

    };

// public static                    ctor.method/Variable = ...

// public shared    name : value , ...
    ctor.prototype = {};

//  Inheritance
//  inherit(ctor, SuperClass);
    return ctor;
})();