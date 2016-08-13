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

        var alignment = new Vector2D(0,0);
        var movingDirection = new Vector2D(0,0);
        var movingSpeed = 0;

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

        self.getMovingDirection = function(){ return movingDirection; };
        self.setMovingDirection = function (value)  { movingDirection = value.normalize(); };

        self.getMovingSpeed = function(){ return movingSpeed; };
        self.setMovingSpeed = function (value)  { movingSpeed = value; };

    };

// public static
    ctor.Type = { FIGHTER : "FIGHTER",Projectile:"Projectile"};
    ctor.State = { INBOUNDS : "InBounds" , OUTOFBOUNDS : "OutOfBounds"};

// public shared
    ctor.prototype = {
        fall : function () {
            var oldDir = this.getMovingDirection();
            var fallDir = new Vector2D(0,2.5);
            var newDir;
            if(oldDir.getX() != 0){
                newDir = oldDir.add(fallDir);
            }else{
                newDir = fallDir;
            }
            this.move(newDir);
        },
        move : function(movingDirection){
            if(null==movingDirection){
                if(null!=this.getMovingDirection()){
                    movingDirection = this.getMovingDirection();
                }else{
                    // TODO ExceptionContext
                    ExceptionContext.throw(new Exception(
                        "GameObject has not a movingDirection and wants to move"));
                    // movingDirection = new Vector2D(0,0);
                    // return;
                }
            }
            var moveOffset = movingDirection.multipleByScalar(this.getMovingSpeed());
            var dummyGameObject = this.clone(moveOffset);
            if(dummyGameObject.getPosition().getX() < 1|| dummyGameObject.getPosition().getX()
                +dummyGameObject.getWidth() > BattleArena.getCurrentMap().getSize().getWidth()){
                return GameObject.State.OUTOFBOUNDS;
            }
            if(dummyGameObject.getPosition().getY() < 1||dummyGameObject.getPosition().getY()
                +dummyGameObject.getHeight() > BattleArena.getCurrentMap().getSize().getHeight()){
                return GameObject.State.OUTOFBOUNDS;
            }
            this.setPosition(this.getPosition().add(moveOffset));
            return GameObject.State.INBOUNDS;
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