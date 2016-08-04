var SpaceShip = (function () {

	var ctor = function(position, alignment){
		var self = this;
        self.constructor.super.call(this,
            GameObject.Type.SpaceShip, position, 3, 2);
		self.setAlignment(alignment);
        self.setMovingSpeed(1.5);

		self.shoots = function () {
			var X = self.getPosition().X + self.getWidth();
			var Y = self.getPosition().Y + (self.getHeight()/2);
			var projectile = new Projectile(new Vector2D(X, Y), self.getAlignment());
			game.addGameObject(projectile);
		};
	};
	inherit(ctor, GameObject);
	return ctor;
})();