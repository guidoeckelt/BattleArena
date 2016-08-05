var ExceptionContext = (function () {

// private static var

// Contructor
    var ctor = function () {
        var self = this; // prevents overlaping this-context

// private var

// public instance only


// Getters & Setters

    };

// public static
    ctor.throw = function (exception) {
        console.log(exception.getMessage());
    };
    ctor.missingCredential = function (credentials) {

    };

// public shared
    ctor.prototype = {};

//  Inheritance
//  inherit(ctor, SuperClass);
    return ctor;
})();
function Exception(messageValue) {
    var message = messageValue;

    this.getMessage = function(){ return message; };
}