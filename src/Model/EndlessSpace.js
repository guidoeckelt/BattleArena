var game, config;//Static variables;
function EndlessSpace(){
    game = this;
	var self = this;
	self.config = new Config();
    config = self.config;
	self.view = new View(self.config);
	self.keybinder = new KeyBinder();
	var midY = this.config.grid.height/2;
	self.spaceship = new SpaceShip(new Vector2D(1, midY),new Vector2D(1,0));
	self.gameObjects = new Array(this.spaceship);

	self.shouldInterupt = false;
//===Game-Interface
	self.start = function (placeholder) {
	    self.view.loadDOM(placeholder);

        // document.addEventListener("keypress",game.keybinder.OnKeyPress);
        //document.addEventListener("keyup",game.keybinder.OnKeyUp);
        $("body").keydown(self.keybinder.OnKeyPress);
        $("body").keyup(self.keybinder.OnKeyUp);

		self.gameLoop();
	};
	self.stop = function () {
		self.shouldInterupt = true;
	};
	self.pause = function () {
		self.shouldInterupt = true;
	};
	self.restart = function () {

	};

	self.gameLoop = function (timeStamp) {
		self.moveGameObjects();
		if(self.keybinder.actionsTriggered[self.config.shoot] == true){
			self.spaceship.shoots();
		}

		self.view.render(self.gameObjects);
		if(self.shouldInterupt){
		    return;
		}
        window.setTimeout(function () { self.gameLoop(); },self.config.delay);
        //window.requestAnimationFrame(function(){ self.gameLoop(); });
	};

	self.moveGameObjects = function () {
		for(var i = 0;i < self.gameObjects.length;i++){
			var gameObject = self.gameObjects[i];
			if (GameObject.Type.SpaceShip == gameObject.getType()) {
				if (self.keybinder.actionsTriggered[self.config.moveLeft[0]] == true
					|| self.keybinder.actionsTriggered[self.config.moveLeft[1]] == true) {
					gameObject.move(new Vector2D(-1, 0));
				}
				if (self.keybinder.actionsTriggered[self.config.moveTop[0]] == true
					|| self.keybinder.actionsTriggered[self.config.moveTop[1]] == true) {
					gameObject.move(new Vector2D(0, -1));
				}
				if (self.keybinder.actionsTriggered[self.config.moveRight[0]] == true
					|| self.keybinder.actionsTriggered[self.config.moveRight[1]] == true) {
					gameObject.move(new Vector2D(1, 0));
				}
				if (self.keybinder.actionsTriggered[self.config.moveBottom[0]] == true
					|| self.keybinder.actionsTriggered[self.config.moveBottom[1]] == true) {
					gameObject.move(new Vector2D(0, 1));
				}
			} else if (GameObject.Type.Projectile == gameObject.getType()) {
				if (GameObject.State.OUTOFVISION == gameObject.move()) {
					self.gameObjects.splice(self.gameObjects.indexOf(gameObject), 1);
					console.log(self.gameObjects.length)
				}
			}
		}
	};

	self.addGameObject = function(gameObject){
		self.gameObjects.push(gameObject);
	}

}
function Config(){
	this.grid = {width:	100, height: 60};
	this.fieldSize = 10;
	this.moveLeft 	= [37,  97];
	this.moveRight 	= [39, 100];
	this.moveTop 	= [38, 119];
	this.moveBottom = [40, 115];
	this.shoot 		= 32;

	this.delay = 10;
	
}