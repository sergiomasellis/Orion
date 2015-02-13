(function(){

	var Player = O.Class.extend(O.Game.Entity, 'O.Game.Entity.Player', O.Game.Entity);

	Player.prototype.init = function() {
		this.controller = new O.Game.Controller;
		O.Logger.log("Player Created");

		this.x = this.canvas.width / 2;
      	this.y = this.canvas.height / 2;

      	this.radius = 70;
	}

	Player.prototype.getShader = function() {

	}

	Player.prototype.update = function() {
		// console.log(this.controller.direction);

		switch(this.controller.direction) {
		    case "w":
		        this.y -= 1;
		        break;
		    case "s":
		        this.y += 1;
		        break;
		    case "a":
		    	this.x -= 1;
		    	break;
		    case "d":
		    	this.x += 1;
		    	break;
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