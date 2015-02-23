(function() {
	'use strict';

	var Main = O.Class.create('O.Main', function Main() {
		this.options = {};
		this.init();
	});

	Main.prototype.init = function () {
		
		O.Config.set({
			engine: "3d"
		});

		this.game =  new O.Game;
        this.welcomeScene = this.game.addScene(new O.Game.Scene({sceneName: "Welcome"}));
		this.player = this.welcomeScene.addEntity(new O.Game.Entity.Player({}, {game: this.game}));
	}


})();