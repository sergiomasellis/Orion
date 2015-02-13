(function() {
	'use strict';

	var Main = O.Class.create('O.Main', function Main() {
		this.options = {};
		this.init();
	});

	Main.prototype.init = function () {
		
		O.Config = {
			engine: "3d"
		};

		this.game =  new O.Game();
		this.player = this.game.addEntity(new O.Game.Entity.Player({}, {canvas: this.game.canvas, context: this.game.context}));
	}


})();