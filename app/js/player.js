import Entity from "Orion/Entity";
import Resources from 'Orion/Resource';
import Injector from 'Orion/Injector';

class Player extends Entity {

    init() {

        this.img = Resources.get('img/avatar_sprite32.png');

        // this.scale = Injector.dependencies.scale;
        this.controller = Injector.dependencies.controller;
        this.camera = Injector.dependencies.camera;

        var coords = this.camera.screenToWorld(0, 0);

        this.x = coords.x;
        this.y = coords.y;

        // console.log(this);

        // this.canvasCenterX = ( this.canvas.width / 2 );
        // this.canvasCenterY = ( this.canvas.height / 2 );


        //pixel size of sprite frame
        this.size = 32;
        this.speed = 16.0;


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

          if(this.y > 0) this.y += this.speed;
          else this.y -= this.speed;

          console.log(this.x, this.y);

          this.controller.direction.W = false;
        }

        if (this.controller.direction.S) {

          if(this.y > 0) this.y -= this.speed;
          else this.y += this.speed;

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

          this.controller.direction.D = false;
        }



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
        //console.log(this.img);
        this.context.drawImage(
            this.img,
            this.size * this.frameIndex,
            0,
            this.size,
            this.size,
            this.x,
            this.y,
            this.size,
            this.size);
        //console.log(this.frameIndex * this.size);
    }
}

export default Player;
