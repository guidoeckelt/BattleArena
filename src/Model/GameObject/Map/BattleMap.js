var BattleMap = (function () {

// private static                   var privateStaticVariable = ...

// Contructor
    var ctor = function (sizeValue) {
        var self = this; // prevents overlaping this-context

// private                          var privateVariable = ...
        var size = sizeValue;

// public instance only             self.method = function(...


// Getters & Setters                self.getVariable = function(...
        self.getSize = function(){ return size; };

    };

// public static                    ctor.method/Variable = ...

// public shared    name : value , ...
    ctor.prototype = {
        draw : function (context) {
            this.drawBackground(context);
            this.drawObstacles(context);
        },
//      BattleMap-Interface
        drawBackground : function (context) {
            context.fillStyle = "#000000";
            var blockSize = 2;
            for(var y = 5;y < context.canvas.height;y+=10){
                for(var x = 5;x < context.canvas.width;x+=10){
                    context.fillRect(x, y, blockSize, blockSize);
                }
            }

        },
        drawObstacles : function (context) {
//      Nothing in here, needs to be overriden
        }
    };

//  Inheritance
//  inherit(ctor, SuperClass);
    return ctor;
})();