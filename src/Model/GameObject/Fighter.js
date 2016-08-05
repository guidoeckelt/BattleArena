var Fighter = (function () {

	var ctor = function(position, alignment){
		var self = this;
        self.constructor.super.call(this,
            GameObject.Type.Fighter, position, 30, 20);
		self.setAlignment(alignment);
        self.setMovingSpeed(5);

		self.shoots = function () {
			var X = self.getPosition().getX() + self.getWidth();
			var Y = self.getPosition().getY() + (self.getHeight()/2);
			var projectile = new Projectile(new Vector2D(X, Y), self.getAlignment());
			BattleArena.addGameObject(projectile);
		};
	};
	inherit(ctor, GameObject);
	return ctor;
})();