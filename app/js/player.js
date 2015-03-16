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
        this.world = this.camera.worldToScreen(0, 0);
        console.log(this);
        this.x = this.coords.x;
        this.y = this.coords.y;
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 30;
        this.numberOfFrames = 2;
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

            this.controller.direction.D = false;
        }


        this.camera.moveTo(this.x, this.y);


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

        //this.context.beginPath();
        //this.context.strokeStyle = "#FF0000";
        //this.context.rect(this.x, this.y, 16, 16);
        //this.context.stroke();



        //console.log(this.frameIndex * this.size);
        //this.x++;


        //this.context.beginPath();
        //this.context.strokeStyle = "#FF0000";
        //this.context.rect(this.camera.viewport.top - 25, this.camera.viewport.left - 25, 50, 50);
        //this.context.stroke();

        //console.log(this.camera.viewport.top, this.camera.viewport.left);

    }
}

export default Player;
