(function(){

	var Player = O.Class.extend(O.Game.Entity, 'O.Game.Entity.Player', O.Game.Entity);

	Player.prototype.init = function() {
		this.controller = new O.Game.Controller;
		O.Logger.log("Player Created");

		return this;
	}

	Player.prototype.getShader = function() {

	}

	Player.prototype.update = function() {

	}

	Player.prototype.draw = function() {

	}

})();