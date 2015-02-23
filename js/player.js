(function(){
    'use strict';

    /**
     * Particle Class
     *
     * @class
     * @name O.Game.Entity.Particle
     *
     * @constructor
     * @param options config settings of the game class
     * @param dependencies instances of other classes
     *
     * @exports Particle as O.Game.Entity.Particle
     */

	var Particle = O.Class.extend(O.Game.Entity, 'O.Game.Entity.Particle', O.Game.Entity);

	Particle.prototype.init = function() {
		//this.controller = new O.Game.Controller;
		O.Logger.log("Particle Created");

		this.x = this.canvas.width * Math.random();
      	this.y = this.canvas.height * Math.random();

      	this.radius = Math.floor(Math.random() * 20);

      	this.speedX = Math.floor(Math.random() * 20) - 10;
        this.speedY = Math.floor(Math.random() * 20) - 10;
        this.color = '#'+Math.floor(Math.random()*16777215).toString(16);


        //this.preContext = this.preRenderCanvas.getContext("2d");


        this.gravity = 3;
        //this.angle = 0;
        this.offsetRadius = 2;
        //this.speed = 0.1;
        //this.spring = 0.3;

        this.img = new Image();
        this.img.src = 'img/wabbit_alpha.png';
        //this.offsetX = (Math.random() * 20) - 10;
        //this.context

        //O.Logger.log("x:"+this.speedX);
        //O.Logger.log("y:"+this.speedY);

      	// console.log(this.dependencies.game);

        //this.grid = new O.Game.Grid;

        //console.log(this.grid);
	}

	Particle.prototype.getShader = function() {

	}

	Particle.prototype.update = function() {


		//if (this.controller.direction.W) {
		//	this.y -= this.speed;
		//}
        //
		//if (this.controller.direction.S) {
		//	this.y += this.speed;
		//}
        //
		//if (this.controller.direction.A) {
		//	this.x -= this.speed;
		//}
        //
		//if (this.controller.direction.D) {
		//	this.x += this.speed;
		//}

        //console.log("here");


        // random particles bouncing off walls
        if(this.x < 0) this.speedX = this.speedX * -1
        if(this.x > this.canvas.width) this.speedX = this.speedX * -1;
        //
        if(this.y < 0) this.speedY = this.speedY * -1;
        if(this.y > this.canvas.height) this.speedY = this.speedY * -1;
        //
        //

        this.x += this.speedX;
        //this.x = (0.5 + this.speedX) << 0;
        this.y += this.speedY;
        //this.y = (0.5 + this.speedY) << 0;

        // this is like a pulse?? but not quite
        //this.radius = this.radius + Math.sin(this.angle) * this.offsetRadius;
        //if(this.radius < 0.5) this.radius = 0.5;
        //this.x = this.canvas.height/2 * Math.cos(this.angle) * this.offsetX;

        //var dx = this.canvas.width/2 - this.x,
            //ax = dx * this.spring;

        //this.angle += ax;



        //this.angle += this.speed;

	}

	Particle.prototype.draw = function() {
        this.context.drawImage(this.img,  (0.5 + this.x) | 0,  (0.5 + this.y) | 0);
        //this.preContext.drawImage(this.img, 0, 0);

        //var imgData=this.preContext.getImageData(0,0, this.canvas.width, this.canvas.height)
        //this.context.putImageData(imgData, this.canvas.width, this.canvas.height);
        //
        //this.context.beginPath();
        //this.context.arc((0.5 + this.x) << 0, (0.5 + this.y) << 0, this.radius, 0, 2 * Math.PI, false);
        //this.context.fillStyle = this.color;
        //this.context.fill();
	}

})();