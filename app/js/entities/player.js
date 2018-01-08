import Injector from "../Orion/Injector";
import WebGLObject from "../Orion/WebGLObject";

class Player extends WebGLObject {
  init() {
    super.init();

    // this.color = [1, 0, 0, 1];
    this.rotation = { x: 0, y: 0, z: 0 };
    // this.mouseSensitivity = 200;
    this.turnRate = 2.0;
  }

  update(dt) {
    if (Injector.get("controller").direction.W) {
      this.x += this.speed * Math.cos(this.rotation.y - Math.PI / 2) * dt;
      this.z -= this.speed * Math.sin(this.rotation.y - Math.PI / 2) * dt;
    }

    if (Injector.get("controller").direction.S) {
      this.x -= this.speed * Math.cos(this.rotation.y - Math.PI / 2) * dt;
      this.z += this.speed * Math.sin(this.rotation.y - Math.PI / 2) * dt;
    }

    if (Injector.get("controller").direction.A) {
      this.rotation.y += this.turnRate * dt;
    }

    if (Injector.get("controller").direction.D) {
      this.rotation.y -= this.turnRate * dt;
    }

    // move player based on mouse movement
    // this.rotation.y -= Injector.get('controller').mouse.movement.x / this.mouseSensitivity;
    // this.rotation.z -= Injector.get('controller').mouse.movement.y / this.mouseSensitivity;
  }
}

export default Player;
