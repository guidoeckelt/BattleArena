var Projectile = (function () {

	var ctor = function(position, directionValue){
		var self = this;
        self.constructor.super.call(this,
		    GameObject.Type.Projectile, position, 1, 0.5);
		self.setAlignment(directionValue);
        self.setMovingDirection(directionValue);
        self.setMovingSpeed(2.5);
    };

	inherit(ctor, GameObject);
	return ctor;
})();