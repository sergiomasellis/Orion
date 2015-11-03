import Injector from 'Orion/Injector';
import WebGlObject from 'Orion/WebGlObject';

class Player extends WebGlObject {

    init() {
        super.init();

        this.color = [1, 0, 0, 1];
    }

    update(dt) {
        if (Injector.dependencies.controller.direction.W) {
            this.x += this.speed * Math.cos(this.rotation.y - Math.PI / 2) * dt;
            this.z -= this.speed * Math.sin(this.rotation.y - Math.PI / 2) * dt;
        }

        if (Injector.dependencies.controller.direction.S) {
            this.x -= this.speed * Math.cos(this.rotation.y - Math.PI / 2) * dt;
            this.z += this.speed * Math.sin(this.rotation.y - Math.PI / 2) * dt;
        }

        if (Injector.dependencies.controller.direction.A) {
            this.rotation.y += this.turnRate * dt;
        }

        if (Injector.dependencies.controller.direction.D) {
            this.rotation.y -= this.turnRate * dt;
        }

        this.rotation.y -= Injector.dependencies.controller.mouse.movement.x / this.mouseSensitivity;
        this.rotation.x -= Injector.dependencies.controller.mouse.movement.y / this.mouseSensitivity;
    }

}

export default Player;