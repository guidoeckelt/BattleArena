var GameObject = (function(){

// private static var

// Constructor
    var ctor = function (typeValue, positionValue, widthValue, heightValue) {
        var self = this; // prevents overlaping this-context
        
// private var
        var self = this;
        var type = typeValue;
        var position = positionValue;
        var width = widthValue;
        var height = heightValue;

        var alignment;
        var movingDirection;
        var movingSpeed;

// public instance only


// Getters & Setters
        self.getType = function(){ return type; };
        self.setType = function (value) { type = value; };

        self.getPosition = function(){ return position; };
        self.setPosition = function (value) { position = value; };

        self.getWidth = function(){ return width; };
        self.setWidth = function (value) { width = value; };

        self.getHeight = function(){ return height; };
        self.setHeight = function (value) { height = value; };

        self.getAlignment = function(){ return alignment; };
        self.setAlignment = function (value) { alignment = value; };

        self.getMovingDirection = function(){ return movingDirection.normalize(); };
        self.setMovingDirection = function (value)  { movingDirection = value; };

        self.getMovingSpeed = function(){ return movingSpeed; };
        self.setMovingSpeed = function (value)  { movingSpeed = value; };

    };

// public static
    ctor.Type = { SpaceShip : "SpaceShip",Projectile:"Projectile"};
    ctor.State = { INVISION : "InVision" , OUTOFVISION : "OutOfVision"};

// public shared
    ctor.prototype = {
        move : function(movingDirection){
            if(null==movingDirection){//&&null!=this.getMovingDirection()){
                if(null!=this.getMovingDirection()){
                    movingDirection = this.getMovingDirection();
                }else{
                    // TODO Exception
                    movingDirection = new Vector2D(0,0);
                }
            }
            var moveOffset = movingDirection.multipleByScalar(this.getMovingSpeed());
            var dummyGameObject = this.clone(moveOffset);
            if(dummyGameObject.getPosition().X < 1||dummyGameObject.getPosition().X+dummyGameObject.getWidth() > config.grid.width){
                return GameObject.State.OUTOFVISION;
            }
            if(dummyGameObject.getPosition().Y < 1||dummyGameObject.getPosition().Y+dummyGameObject.getHeight()-1 > config.grid.height){
                return GameObject.State.OUTOFVISION;
            }
            this.setPosition(this.getPosition().add(moveOffset));
            return GameObject.State.INVISION;
        },
        clone : function(movingDirection){
            var newGameObject = new GameObject(this.getType(), this.getPosition()
                , this.getWidth(), this.getHeight());
            if(movingDirection){
                var newPosition = newGameObject.getPosition().add(movingDirection);
                newGameObject.setPosition(newPosition);
            }
            return newGameObject;
        }
    };
    
//  Inheritance
//  inherit(ctor, SuperClass);
    return ctor;
})();