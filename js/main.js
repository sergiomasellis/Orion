(function() {
	'use strict';

	var Main = O.Class.create('O.Main', function Main() {
		this.options = {};
        this.scenes = [];
        this.entities = [];
		this.init();
	});

	Main.prototype.init = function () {
		
		O.Config.setConfig({
			engine: "2d"
		});

		this.game =  new O.Game;
        this.scenes["welcomeScene"] = this.game.addScene(new O.Game.Scene({sceneName: "Welcome"}));
        this.entities["player"] = this.scenes["welcomeScene"].addEntity(new O.Game.Entity.Player({}, {game: this.game}));
	}


})();