import Entity from "Orion/Entity";

class Player extends Entity{

    init(){

      this.x = this.canvas.width * Math.random();
      this.y = this.canvas.height * Math.random();

      this.radius = Math.floor(Math.random() * 20);

      this.speed = 100;
      this.color = '#'+Math.floor(Math.random()*16777215).toString(16);


      this.img = new Image();
      this.img.src = 'img/log_acacia_heart.png';
    }

    update(dt){

        // random particles bouncing off walls
        if(this.x < 0) this.speedX = this.speedX * -1
        if(this.x > this.canvas.width) this.speedX = this.speedX * -1;

        if(this.y < 0) this.speedY = this.speedY * -1;
        if(this.y > this.canvas.height) this.speedY = this.speedY * -1;

        this.x += this.speed * dt;
        this.y += this.speed * dt;

    }

    draw(){
        this.context.drawImage(this.img,  (0.5 + this.x) | 0,  (0.5 + this.y) | 0);
    }
}

export default Player;
