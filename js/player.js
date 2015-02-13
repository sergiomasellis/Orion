(function(){

	var Player = O.Class.extend(O.Game.Entity, 'O.Game.Entity.Player', O.Game.Entity);

	Player.prototype.init = function() {
		var input = new O.Game.Controller.Input({},{utils: this.utils, logger: this.logger, canvas: this.canvas, context: this.context});
		O.Logger.log("Player Created");
	}

	Player.prototype.getShader = function() {

	}

	Player.prototype.update = function() {

	}

	Player.prototype.draw = function() {

	}

})();