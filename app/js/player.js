import Entity from "Orion/Entity";
import Resources from 'Orion/Resource';
import Injector from 'Orion/Injector';

class Player extends Entity {

    init() {

        this.img = Resources.get('img/avatar_sprite32.png');

        // this.scale = Injector.dependencies.scale;
        this.controller = Injector.dependencies.controller;
        this.camera = Injector.dependencies.camera;


        this.size = 32;
        this.speed = 16.0;

        this.coords = this.camera.screenToWorld(0, 0);
        this.world = this.camera.screenToWorld(0, 0);

        this.x = this.coords.x - 8;
        this.y = this.coords.y - 8;

        // console.log(this);

        // this.canvasCenterX = ( this.canvas.width / 2 );
        // this.canvasCenterY = ( this.canvas.height / 2 );


        //pixel size of sprite frame




        // this.x = this.canvasCenterX;
        // this.y = this.canvasCenterY;

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 30;
        this.numberOfFrames = 2;

        //console.log(this.img);

    }

    update() {

      // this.camera.moveTo(this.x, this.y);

        if (this.controller.direction.W) {

          this.y -= this.speed;

          console.log(this.x, this.y);

          this.controller.direction.W = false;
        }

        if (this.controller.direction.S) {
            this.y += this.speed;

          console.log(this.x, this.y);

          this.controller.direction.S = false;
        }

        if (this.controller.direction.A) {

          this.x -= this.speed;

          console.log(this.x, this.y);

          this.controller.direction.A = false;
        }

        if (this.controller.direction.D) {

          this.x += this.speed;

          console.log(this.x, this.y);

            this.camera.moveTo(this.canvas.width/2, this.canvas.height/2);



          this.controller.direction.D = false;
        }


        //this.camera.follow(this);



        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {

            this.tickCount = 0;

            // If the current frame index is in range
            if (this.frameIndex < this.numberOfFrames - 1) {
                // Go to the next frame
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
            }
        }
    }

    draw() {

        //this.context.drawImage(
        //    this.img,
        //    this.size * this.frameIndex,
        //    0,
        //    this.size,
        //    this.size,
        //    this.x,
        //    this.y,
        //    this.size,
        //    this.size);
        //console.log(this.frameIndex * this.size);

        //this.x++;


        this.context.beginPath();
        this.context.strokeStyle="#FF0000";
        this.context.rect(this.camera.viewport.top - 25, this.camera.viewport.left - 25, 50,50);
        this.context.stroke();

        //console.log(this.camera.viewport.top, this.camera.viewport.left);

    }
}

export default Player;
