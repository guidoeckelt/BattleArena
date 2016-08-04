/**
 * Created by Guido on 01.08.2016.
 */
var KeyBinder = (function(){

// private static var

// Constructor
    var ctor = function () {
        var self = this; // prevents overlaping this-context

// private var
        self.actionsTriggered = new Array();
        var keyBindings = new Array();

// public instance only
        self.OnKeyPress = function (event) {
            var key = event.which;
            var keyCode = event.keyCode;
            switch(keyCode){
                case 37: self.actionsTriggered[keyCode] = true; break;
                case 39: self.actionsTriggered[keyCode] = true; break;
                case 38: self.actionsTriggered[keyCode] = true; break;
                case 40: self.actionsTriggered[keyCode] = true; break;
                default: console.log("keyCode:"+keyCode);
            }
            switch(key){
                case  32: self.actionsTriggered[key] = true; break;
                /*case  97: game.actionsTriggered[key] = true; break;
                 case 100: game.actionsTriggered[key] = true; break;
                 case 115: game.actionsTriggered[key] = true; break;
                 case 119: game.actionsTriggered[key] = true; break;*/
                default: console.log("key:"+key);
            }
            event.preventDefault();

        };
        self.OnKeyUp = function (event) {
            self.actionsTriggered[event.keyCode] = false;
            self.actionsTriggered[event.which] = false;
        };


// Getters & Setters
        self.getKeyBindings = function(){ return keyBindings; };
        self.setKeyBindings = function (value)  { keyBindings = value; };
    };

// public static

// public shared
    ctor.prototype = {
        add : function (keyBinding) {
            this.getKeyBindings().add(keyBinding);
        },
        remove : function (keyBinding) {
            this.getKeyBindings().remove(keyBinding);
        },
        getByKeyCombination : function (keyCombination) {

        }
    };

//  Inheritance
//  inherit(ctor, SuperClass);
    return ctor;
})();
