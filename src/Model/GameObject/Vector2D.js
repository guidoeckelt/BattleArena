var Vector2D = (function () {

// private static var

// Contructor
    var ctor = function (posX,posY) {
        var self = this; // prevents overlaping this-context

// private var
        var x = posX;
        var y = posY;

// public instance only


// Getters & Setters
        self.getX = function(){ return x; };

        self.getY = function(){ return y; };

    };

// public static
    ctor.add = function (other) {
        if (Vector2D != other.constructor) {
            // TODO Exception
            return;
        }
        return new Vector2D(this.getX()+other.getX(), this.getY()+other.getY());

    };
    ctor.substract = function (other) {
        if (Vector2D != other.constructor) {
            // TODO Exception
            return;
        }
        return new Vector2D(this.getX()-other.getX(), this.getY()-other.getY());

    };
    ctor.multipleByScalar = function (scalar) {
        if (Number != scalar.prototype) {
            // TODO Exception
            return;
        }
        return new Vector2D(this.getX()*scalar, this.getY()*scalar);
    };

// public shared
    ctor.prototype = {
        length : function () {
            return Math.sqrt(Math.pow(this.getX(),2)+Math.pow(this.getY(),2));
        },
        normalize : function () {
            var length = this.length();
            return new Vector2D(this.getX()/length, this.getY()/length);
        }
    };

//  Inheritance
//  inherit(ctor, SuperClass);
    return ctor;
})();