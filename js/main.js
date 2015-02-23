(function() {
	'use strict';

	var Main = O.Class.create('O.Main', function Main() {
		this.options = {};
        this.scenes = [];
		this.init();
	});

	Main.prototype.init = function () {
		
		O.Config.setConfig({
			engine: "3d"
		});

		this.game =  new O.Game;
        this.welcomeScene = this.game.addScene(new O.Game.Scene({sceneName: "Welcome"}));

        //testing particles
        for (var i = 0; i < 100; i++) {
            this.welcomeScene.addEntity(new O.Game.Entity.Particle({}, {game: this.game}));
        }

        //this.scenes[0].addEntity(new O.Game.Entity.Particle({}, {game: this.game}));
        //this.entities["player2"] = this.scenes[0].addEntity(new O.Game.Entity.Particle({}, {game: this.game}));

        //console.log(this.scenes);
        //this.entities["player2"] = this.scenes["welcomeScene"].addEntity(new O.Game.Entity.Particle({}, {game: this.game}));
	}


})();