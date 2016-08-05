var Projectile = (function () {

	var ctor = function(position, directionValue){
		var self = this;
        self.constructor.super.call(this,
		    GameObject.Type.Projectile, position, 10, 5);
		self.setAlignment(directionValue);
        self.setMovingDirection(directionValue);
        self.setMovingSpeed(20);
    };

	inherit(ctor, GameObject);
	return ctor;
})();