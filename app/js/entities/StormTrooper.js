import WebGLObject from "../Orion/WebGLObject";

class StormTrooper extends WebGLObject {
  update() {
    this.x += 0.3 * Math.sin(this.z) / 8;
    this.z += 0.3 * Math.cos(this.x) / 8;
  }
}

export default StormTrooper;
