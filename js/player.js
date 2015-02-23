(function(){
    'use strict';

    /**
     * Player Class
     *
     * @class
     * @name O.Game.Entity.Player
     *
     * @constructor
     * @param options config settings of the game class
     * @param dependencies instances of other classes
     *
     * @exports Player as O.Game.Entity.Player
     */

	var Player = O.Class.extend(O.Game.Entity, 'O.Game.Entity.Player', O.Game.Entity);

	Player.prototype.init = function() {
		this.controller = new O.Game.Controller;
		O.Logger.log("Player Created");

		this.x = this.canvas.width / 2;
      	this.y = this.canvas.height / 2;

      	this.radius = 70;
      	this.speed = 10;

      		// console.log(this.dependencies.game);
	}

	Player.prototype.getShader = function() {

	}

	Player.prototype.update = function() {


		if (this.controller.direction.W) {
			this.y -= this.speed;
		}

		if (this.controller.direction.S) {
			this.y += this.speed;
		}

		if (this.controller.direction.A) {
			this.x -= this.speed;
		}

		if (this.controller.direction.D) {
			this.x += this.speed;
		}

	}

	Player.prototype.draw = function() {

	  this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      this.context.fillStyle = 'green';
      this.context.fill();
      this.context.lineWidth = 5;
      this.context.strokeStyle = '#003300';
      this.context.stroke();

	}

})();