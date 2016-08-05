var game;
var BattleArena = (function () {

// private static var
        var gameObjects = new Array();

// Contructor
    var ctor = function () {
        game = this;
        var self = this; // prevents overlaping this-context

        var midY = Config.grid.height/2;
// private var
        var config = new Config();
        var view = new View();
        var keyBinder = new KeyBinder();
        var fighter = new Fighter(new Vector2D(1, midY),new Vector2D(1,0));
        BattleArena.addGameObject(fighter);
        var shouldInterupt = false;

// public instance only

        self.gameLoop = function (timeStamp) {
            self.moveGameObjects();
            if(self.getKeyBinder().actionsTriggered[Config.shoot] == true){
                self.getFighter().shoots();
            }

            if(self.shouldInterupt()){
                return;
            }
            window.setTimeout(function () { self.gameLoop(); },Config.delay);
            //window.requestAnimationFrame(function(){ self.gameLoop(); });
        };

        self.moveGameObjects = function () {
            var gameObjects = BattleArena.getGameObjects();
            for(var i = 0;i < gameObjects.length;i++){
                var gameObject = gameObjects[i];
                if (GameObject.Type.Fighter == gameObject.getType()) {
                    if (self.getKeyBinder().actionsTriggered[Config.moveLeft[0]] == true
                        || self.getKeyBinder().actionsTriggered[Config.moveLeft[1]] == true) {
                        gameObject.move(new Vector2D(-1, 0));
                    }
                    if (self.getKeyBinder().actionsTriggered[Config.moveTop[0]] == true
                        || self.getKeyBinder().actionsTriggered[Config.moveTop[1]] == true) {
                        gameObject.move(new Vector2D(0, -1));
                    }
                    if (self.getKeyBinder().actionsTriggered[Config.moveRight[0]] == true
                        || self.getKeyBinder().actionsTriggered[Config.moveRight[1]] == true) {
                        gameObject.move(new Vector2D(1, 0));
                    }
                    if (self.getKeyBinder().actionsTriggered[Config.moveBottom[0]] == true
                        || self.getKeyBinder().actionsTriggered[Config.moveBottom[1]] == true) {
                        gameObject.move(new Vector2D(0, 1));
                    }
                } else if (GameObject.Type.Projectile == gameObject.getType()) {
                    if (GameObject.State.OUTOFVISION == gameObject.move()) {
                        BattleArena.removeGameObject(gameObject);
                    }
                }
            }
        };


// Getters & Setters
        self.getConfig = function(){ return config; };
        self.getView = function(){ return view; };
        self.getKeyBinder = function(){ return keyBinder; };
        self.getFighter = function(){ return fighter; };

        self.shouldInterupt = function(){ return shouldInterupt; };
        self.setShouldInterupt = function (value) { shouldInterupt = value; };

    };

// public static
    ctor.getGameObjects = function () {
        return gameObjects;
    };
    ctor.addGameObject = function (gameObject) {
        if (GameObject != gameObject.constructor) {
            // TODO Exception
            return;
        }
        gameObjects.push(gameObject);
    };
    ctor.removeGameObject = function(gameObject){
        if (GameObject != gameObject.constructor) {
            // TODO Exception
            return;
        }
        gameObjects.splice(gameObjects.indexOf(gameObject),1);
        console.log(gameObjects.length);
    };

// public shared
    ctor.prototype = {
        start : function (placeholder) {
            this.getView().loadDOM(placeholder);

            // document.addEventListener("keypress",game.keybinder.OnKeyPress);
            //document.addEventListener("keyup",game.keybinder.OnKeyUp);
            $("body").keydown(this.getKeyBinder().OnKeyPress);
            $("body").keyup(this.getKeyBinder().OnKeyUp);

            this.gameLoop();
            this.getView().startRender();
        },
        pause : function () {
            this.setShouldInterupt(true);
            this.getView().stopRender();
        },
        restart : function () {

        }
    };

//  Inheritance
//  inherit(ctor, SuperClass);
    return ctor;
})();