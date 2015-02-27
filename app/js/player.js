import Entity from "Orion/Entity";
import Resources from 'Orion/Resource';
import Injector from 'Orion/Injector';

class Player extends Entity {

    init() {

        this.img = Resources.get('img/avatar_sprite32.png');
        this.scale = Injector.dependencies.scale;

        this.canvasCenterX = ( this.canvas.width / 2 );
        this.canvasCenterY = ( this.canvas.height / 2 );

        //pixel size of sprite frame
        this.size = 32;

        this.x = this.canvasCenterX - (this.size/2);
        this.y = this.canvasCenterY - (this.size/2);


        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 30;
        this.numberOfFrames = 2;

        //console.log(this.img);

    }

    update() {
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
            (0.5 + this.x) | 0,
            (0.5 + this.y) | 0,
            this.size,
            this.size);
        //console.log(this.frameIndex * this.size);
    }
}

export default Player;
