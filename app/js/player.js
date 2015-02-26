import Entity from "Orion/Entity";
import Resources from 'Orion/Resource';

class Player extends Entity {

    init() {

        this.img = Resources.get('img/avatar_sprite.png');

        this.x = this.canvas.width / 5;
        this.y = this.canvas.height / 5;
        this.size = 25;


        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 10;
        this.numberOfFrames = 6;

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
        this.context.drawImage(
            this.img,
            this.frameIndex * this.size,
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
