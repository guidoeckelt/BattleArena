var game;
var BattleArena = (function () {

// private static var
    var gameObjects = new Array();
    var fighters = new Array();
    var currentMap;

// Contructor
    var ctor = function (domPlaceHolder) {
        game = this;
        var self = this; // prevents overlaping this-context

// private              var privateVariable
        var config = new Config();
        var view = new View();
        var keyContext = new KeyContext();

        var delay = 20;
        var shouldInterupt = false;

// public instance only
//      Start Battle
        self.chooseMap = function () {
            var gameChosen = Config.Maps.THESHOWDOWN;
            switch(gameChosen){
                case Config.Maps.THESHOWDOWN: currentMap = new TheShowDown(); break;
            }
        };
        self.chooseFighters = function () {
            var chosenFighters = new Array();
            chosenFighters.push(Config.Fighters.FIGHTER);

            return chosenFighters;
        };
        self.initBattle = function (chosenFighters, chosenMap) {
            switch (chosenMap){
                case Config.Maps.THESHOWDOWN: currentMap = new TheShowDown(); break;

            }
            for(var type of chosenFighters){
                var posY = currentMap.getSize().getHeight()/3;
                var posX = currentMap.getSize().getWidth()/3;
                var fighter;
                switch (type){
                    case Config.Fighters.FIGHTER : fighter =
                        new Fighter(new Vector2D(posX, posY),new Vector2D(1,0));
                }
                BattleArena.addGameObject(fighter);
                fighters.push(fighter);
            }

            shouldInterupt = false;
            // document.addEventListener("keypress",game.keybinder.OnKeyPress);
            //document.addEventListener("keyup",game.keybinder.OnKeyUp);
            $("body").keydown(this.getKeyContext().OnKeyPress);
            $("body").keyup(this.getKeyContext().OnKeyUp);
            gameLoop();
            view.startRender();
        };
//      Game
        self.start = function () {

            var chosenFighters = self.chooseFighters();
            var chosenMap = self.chooseMap();
            self.initBattle(chosenFighters,chosenMap);
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
            self.gravity();
            self.moveGameObjects();
            if(self.getKeyContext().actionsTriggered[Config.shoot] == true){
                BattleArena.getFighters()[0].shoots();
            }

            if(self.shouldInterupt()){
                return;
            }
            window.setTimeout(function () { gameLoop(); },delay);
            //window.requestAnimationFrame(function(){ self.gameLoop(); });
        };

        self.gravity = function(){
            var gameObjects = BattleArena.getGameObjects();
            for(var i = 0;i < gameObjects.length;i++){
                var gameObject = gameObjects[i];
                gameObject.fall();
            }
        };
        self.moveGameObjects = function () {
            var gameObjects = BattleArena.getGameObjects();
            for(var i = 0;i < gameObjects.length;i++){
                var gameObject = gameObjects[i];
                if (GameObject.Type.FIGHTER == gameObject.getType()) {
                    if (self.getKeyContext().actionsTriggered[Config.moveLeft[0]] == true
                        || self.getKeyContext().actionsTriggered[Config.moveLeft[1]] == true) {
                        gameObject.move(new Vector2D(-1, 0));
                    }
                    if (self.getKeyContext().actionsTriggered[Config.moveTop[0]] == true
                        || self.getKeyContext().actionsTriggered[Config.moveTop[1]] == true) {
                        gameObject.jump();
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
                    if (GameObject.State.OUTOFBOUNDS == gameObject.move()) {
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
        self.shouldInterupt = function(){ return shouldInterupt; };
    };

// public static
    ctor.getGameObjects = function () { return gameObjects; };
    ctor.getCurrentMap = function () { return currentMap; };
    ctor.getFighters= function () { return fighters; };

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