function View(){
	var self = this;
    self.size = Config.calculateViewSize();
	self.canvas;
	self.context;
    self.delay = 1;
    self.shouldInterupt = false;

	self.loadDOM = function (placeholder) {
		var canvas = document.createElement("canvas");
		canvas.width  = self.size.width;
		canvas.height = self.size.height;
		canvas.classList.add("scene");
		self.canvas = canvas;
		self.context = canvas.getContext("2d");

		var placeholderDOM = document.getElementById(placeholder);
		var parent = placeholderDOM.parentNode;
		parent.removeChild(placeholderDOM);
		parent.appendChild(canvas);
	};
	self.startRender = function(){
		self.render();
	};
	self.stopRender = function () {
        self.shouldInterupt = true;
    };

	self.render = function () {
		self.context.clearRect(0,0,self.canvas.width, self.canvas.height);
		BattleArena.getCurrentMap().draw(self.context);
		self.drawObjects(BattleArena.getGameObjects());

		if(self.shouldInterupt){
			return;
		}
		window.setTimeout(function () { self.render(); },self.delay);
	};
	self.drawObjects = function(gameObjects){
		for(var gameObject of gameObjects){
			if (GameObject.Type.FIGHTER == gameObject.getType()) {
				self.drawFighter(gameObject);
			} else if (GameObject.Type.Projectile == gameObject.getType()) {
				self.drawProjectile(gameObject);
			}
		}
	};

	self.drawFighter = function(fighter){
		var x = fighter.getPosition().getX();
		var y = fighter.getPosition().getY();
		var width = fighter.getWidth();
		var height = fighter.getHeight();
		self.context.fillStyle = "#ff0000";
		self.context.fillRect(x, y, width, height);
	};
	self.drawProjectile = function(projectile){
		var x = projectile.getPosition().getX();
		var y = projectile.getPosition().getY();
		var width = projectile.getWidth();
		var height = projectile.getHeight();
		self.context.fillStyle = "#0000ff";
		self.context.fillRect(x, y, width, height);
	};
}
