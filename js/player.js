(function(){

	var Particle = O.Class.extend(O.Game.Entity, 'O.Game.Entity.Particle', O.Game.Entity);

	Particle.prototype.init = function() {
		this.controller = new O.Game.Controller;
		O.Logger.log("Particle Created");

		// this.x = this.canvas.width / 2;
		// this.y = this.canvas.height / 2;

		this.x = Math.random() * this.canvas.width;
		this.y = Math.random() * this.canvas.height;

      	this.radius = 70;
      	this.speed = 10 * Math.random();
	}

	Particle.prototype.getShader = function() {

	}

	Particle.prototype.update = function() {

		if (this.controller.direction.W) {
			this.y -= this.speed;
		}

		// if (this.controller.direction.S) {
			this.y += this.speed;
		// }

		if (this.controller.direction.A) {
			this.x -= this.speed;
		}

		// if (this.controller.direction.D) {
			this.x += this.speed;
		// }

	}

	Particle.prototype.draw = function() {

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