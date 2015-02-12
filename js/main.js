(function() {
	'use strict';

	var Main = O.Class.create('O.Main', function Main() {
		this.options = {};
		this.init();
	});

	Main.prototype.init = function () {
		this.game =  new O.Game({engine: "2d"}, {});
		this.player = this.game.addEntity(new O.Game.Entity.Player({}, {canvas: this.game.canvas, context: this.game.context}));
	}


})();