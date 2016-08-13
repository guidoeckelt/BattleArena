var TheShowDown = (function () {

// private static                   var privateStaticVariable = ...

// Contructor
    var ctor = function () {
        var self = this; // prevents overlaping this-context
        self.constructor.super.call(this,
            new Dimension3D(1000,1000,500));

// private                          var privateVariable = ...
        var bgWidth = 600;
        var bgHeight = 200;
        var x = (self.getSize().getWidth()/2)-(bgWidth/2);
        var y = (self.getSize().getHeight()/2)-(bgHeight/2);
        var battleGround = new GameObject("BattleGround",new Vector2D(x,y),bgWidth,bgHeight);


// public instance only             self.method = function(...
//      BattleMap-Interface
        self.drawBackground = function (context) {
            self.constructor.super.prototype.drawBackground.call(this,context);

        };
        self.drawObstacles = function (context) {
            var x = battleGround.getPosition().getX();
            var y = battleGround.getPosition().getY();
            var width = battleGround.getWidth();
            var height = battleGround.getHeight();
            context.fillStyle = "#000";
            context.fillRect(x, y, width, height);
        };

// Getters & Setters                self.getVariable = function(...

    };

// public static                    ctor.method/Variable = ...

// public shared    name : value , ...
    ctor.prototype = {};

//  Inheritance
    inherit(ctor, BattleMap);
    return ctor;
})();