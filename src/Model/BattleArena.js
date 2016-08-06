var game;
var BattleArena = (function () {

// private static var
        var gameObjects = new Array();

// Contructor
    var ctor = function (domPlaceHolder) {
        game = this;
        var self = this; // prevents overlaping this-context

        var midY = Config.grid.height/2;
// private              var privateVariable
        var config = new Config();
        var view = new View();
        var keyContext = new KeyContext();
        var fighter = new Fighter(new Vector2D(1, midY),new Vector2D(1,0));
        BattleArena.addGameObject(fighter);

        var delay = 20;
        var shouldInterupt = false;

// public instance only

//      Game
        self.start = function () {
            // document.addEventListener("keypress",game.keybinder.OnKeyPress);
            //document.addEventListener("keyup",game.keybinder.OnKeyUp);
            $("body").keydown(this.getKeyContext().OnKeyPress);
            $("body").keyup(this.getKeyContext().OnKeyUp);

            shouldInterupt = false;
            gameLoop();
            view.startRender();
        };
        self.pause = function () {
            $("body").unbind("keydown",this.getKeyContext().OnKeyPress);
            $("body").unbind("keyup",this.getKeyContext().OnKeyUp);

            shouldInterupt = true;
            view.stopRender();
        };
        self.restart = function () {

        };
        var gameLoop = function (timeStamp) {
            self.moveGameObjects();
            if(self.getKeyContext().actionsTriggered[Config.shoot] == true){
                self.getFighter().shoots();
            }

            if(self.shouldInterupt()){
                return;
            }
            window.setTimeout(function () { gameLoop(); },delay);
            //window.requestAnimationFrame(function(){ self.gameLoop(); });
        };

        self.moveGameObjects = function () {
            var gameObjects = BattleArena.getGameObjects();
            for(var i = 0;i < gameObjects.length;i++){
                var gameObject = gameObjects[i];
                if (GameObject.Type.Fighter == gameObject.getType()) {
                    if (self.getKeyContext().actionsTriggered[Config.moveLeft[0]] == true
                        || self.getKeyContext().actionsTriggered[Config.moveLeft[1]] == true) {
                        gameObject.move(new Vector2D(-1, 0));
                    }
                    if (self.getKeyContext().actionsTriggered[Config.moveTop[0]] == true
                        || self.getKeyContext().actionsTriggered[Config.moveTop[1]] == true) {
                        gameObject.move(new Vector2D(0, -1));
                    }
                    if (self.getKeyContext().actionsTriggered[Config.moveRight[0]] == true
                        || self.getKeyContext().actionsTriggered[Config.moveRight[1]] == true) {
                        gameObject.move(new Vector2D(1, 0));
                    }
                    if (self.getKeyContext().actionsTriggered[Config.moveBottom[0]] == true
                        || self.getKeyContext().actionsTriggered[Config.moveBottom[1]] == true) {
                        gameObject.move(new Vector2D(0, 1));
                    }
                } else if (GameObject.Type.Projectile == gameObject.getType()) {
                    if (GameObject.State.OUTOFVISION == gameObject.move()) {
                        BattleArena.removeGameObject(gameObject);
                    }
                }
            }
        };

        (function init() {
            view.loadDOM(domPlaceHolder);
        })();
// Getters & Setters
        self.getConfig = function(){ return config; };
        self.getView = function(){ return view; };
        self.getKeyContext = function(){ return keyContext; };
        self.getFighter = function(){ return fighter; };
        self.shouldInterupt = function(){ return shouldInterupt; };
    };

// public static
    ctor.getGameObjects = function () {
        return gameObjects;
    };
    ctor.addGameObject = function (gameObject) {
        if (GameObject != gameObject.constructor.super) {
            // TODO ExceptionContext
            ExceptionContext.throw(new Exception("Object is not a GameObject"));
            //return;
        }
        gameObjects.push(gameObject);
        console.log(gameObjects.length);
    };
    ctor.removeGameObject = function(gameObject){
        if (GameObject != gameObject.constructor.super) {
            // TODO ExceptionContext
            ExceptionContext.throw(new Exception("Object is not a GameObject"));
            // return;
        }
        gameObjects.splice(gameObjects.indexOf(gameObject),1);
        console.log(gameObjects.length);
    };

// public shared
    ctor.prototype = {
    };

//  Inheritance
//  inherit(ctor, SuperClass);
    return ctor;
})();