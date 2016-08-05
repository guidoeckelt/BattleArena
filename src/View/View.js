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


        // document.addEventListener("keypress",game.keybinder.OnKeyPress);
        //document.addEventListener("keyup",game.keybinder.OnKeyUp);
        $(window).keydown(game.keybinder.OnKeyPress);
        $(window).keyup(game.keybinder.OnKeyUp);
	};
	self.startRender = function(gameObjects){
		self.context.clearRect(0,0,self.canvas.width, self.canvas.height);
		self.drawBackground();
		self.drawObjects(gameObjects);

        if(self.shouldInterupt){
            return;
        }
		window.setTimeout(function () { self.startRender(gameObjects); },self.delay);
	};
	self.stopRender = function () {
        self.shouldInterupt = true;
    };

	self.drawBackground = function () {
		self.context.fillStyle = "#000000";
		var blockSize = 2;
		for(var y = 5;y < self.size.height;y+=10){
			for(var x = 5;x < self.size.width;x+=10){
				self.context.fillRect(x, y, blockSize, blockSize);
			}
		}
	};
	self.drawObjects = function(gameObjects){
		for(var gameObject of gameObjects){
			if (GameObject.Type.Fighter == gameObject.getType()) {
				self.drawFighter(gameObject);
			} else if (GameObject.Type.Projectile == gameObject.getType()) {
				self.drawProjectile(gameObject);
			}
		}
	};

	self.drawFighter = function(fighter){
		var x = fighter.getPosition().X;
		var y = fighter.getPosition().Y;
		var width = fighter.getWidth();
		var height = fighter.getHeight();
		self.context.fillStyle = "#ff0000";
		self.context.fillRect(x, y, width, height);
	};
	self.drawProjectile = function(projectile){
		var x = projectile.getPosition().X;
		var y = projectile.getPosition().Y;
		var width = projectile.getWidth();
		var height = projectile.getHeight();
		self.context.fillStyle = "#0000ff";
		self.context.fillRect(x, y, width, height);
	};
}
