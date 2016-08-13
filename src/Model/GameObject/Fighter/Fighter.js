var Fighter = (function () {

	var ctor = function(position, alignment){
		var self = this;
        self.constructor.super.call(this,
            GameObject.Type.FIGHTER, position, 30, 50);
        self.setAlignment(alignment);
        self.setMovingSpeed(5);

		var healthPercent;
        var AttackDamage;
        var jumpPower = 2;

        var timesJumped = 0;




		self.shoots = function () {
			var X = self.getPosition().getX() + self.getWidth();
			var Y = self.getPosition().getY() + (self.getHeight()/2);
			var projectile = new Projectile(new Vector2D(X, Y), self.getAlignment());
			BattleArena.addGameObject(projectile);
		};


        self.getJumpPower = function(){ return jumpPower; };
	};
	inherit(ctor, GameObject);
    ctor.prototype.jump = function () {
        var oldDir = this.getMovingDirection();
        var jumpDir = new Vector2D(0,this.getJumpPower()*-1);
        var newDir;
        if(oldDir.getX() != 0){
            newDir = oldDir.add(jumpDir);
        }else{
            newDir = jumpDir;
        }
        this.constructor.super.prototype.move.call(this,newDir);
    };
	return ctor;
})();