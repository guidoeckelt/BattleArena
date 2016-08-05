var game;//Static variables;
function BattleArena(){
    game = this;
	var self = this;
	self.config = new Config();
	self.view = new View();
	self.keybinder = new KeyBinder();
	var midY = Config.grid.height/2;
	self.fighter = new Fighter(new Vector2D(1, midY),new Vector2D(1,0));
	self.gameObjects = new Array(this.fighter);

	self.shouldInterupt = false;
//===Game-Interface
	self.start = function (placeholder) {
	    self.view.loadDOM(placeholder);

        // document.addEventListener("keypress",game.keybinder.OnKeyPress);
        //document.addEventListener("keyup",game.keybinder.OnKeyUp);
        $("body").keydown(self.keybinder.OnKeyPress);
        $("body").keyup(self.keybinder.OnKeyUp);

		self.gameLoop();
		self.view.startRender(self.gameObjects);
	};
	self.stopRender = function () {
		self.shouldInterupt = true;
		self.view.stopRender();
	};
	self.pause = function () {
		self.shouldInterupt = true;
		self.view.stopRender();
	};
	self.restart = function () {

	};

	self.gameLoop = function (timeStamp) {
		self.moveGameObjects();
		if(self.keybinder.actionsTriggered[Config.shoot] == true){
			self.fighter.shoots();
		}

		if(self.shouldInterupt){
		    return;
		}
        window.setTimeout(function () { self.gameLoop(); },Config.delay);
        //window.requestAnimationFrame(function(){ self.gameLoop(); });
	};

	self.moveGameObjects = function () {
		for(var i = 0;i < self.gameObjects.length;i++){
			var gameObject = self.gameObjects[i];
			if (GameObject.Type.Fighter == gameObject.getType()) {
				if (self.keybinder.actionsTriggered[Config.moveLeft[0]] == true
					|| self.keybinder.actionsTriggered[Config.moveLeft[1]] == true) {
					gameObject.move(new Vector2D(-1, 0));
				}
				if (self.keybinder.actionsTriggered[Config.moveTop[0]] == true
					|| self.keybinder.actionsTriggered[Config.moveTop[1]] == true) {
					gameObject.move(new Vector2D(0, -1));
				}
				if (self.keybinder.actionsTriggered[Config.moveRight[0]] == true
					|| self.keybinder.actionsTriggered[Config.moveRight[1]] == true) {
					gameObject.move(new Vector2D(1, 0));
				}
				if (self.keybinder.actionsTriggered[Config.moveBottom[0]] == true
					|| self.keybinder.actionsTriggered[Config.moveBottom[1]] == true) {
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