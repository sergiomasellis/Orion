import WebGLObject from "./WebGLObject";
import Models from "./Model";


class Plane extends WebGLObject {
  init() {

    Models.modelCache.set("primativePlane", {});
    Models.modelCache.get("primativePlane").verts = [-1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, -1.0, 0.0, -1.0];
    // Models.modelCache.get("primativePlane").verts = positions;
    // Models.modelCache.get("primativePlane").normals = normals;
    // Models.modelCache.get("primativePlane").uv = uvs;
    // Models.modelCache.get("primativePlane").indices = indices;

    super.init({ model: "primativePlane", color: [0.5, 1.0, 0.5, 1.0] });
  }
}

export default Plane;
