import Injector from 'Orion/Injector';
import Entity from "Orion/Entity";
import Shader from 'Orion/Shader';

export default class Camera extends Entity {

    init() {

        this.gl = Injector.get("gl");
        this.nearClip = this.options.nearClip || 0.1;
        this.farClip = this.options.farClip || 1000.0;
        this.distance = this.options.distance || {x:0, y:0, z:0};
        this.fieldOfView = this.options.fieldOfView || Math.PI*0.3;
        this.aspectRatio = this.options.aspectRatio || this.canvas.width / this.canvas.height;
        this.focus = this.options.focus || null;


        this.pMatrix = mat4.create();
    }

    update(dt) {
  
        if(this.focus != null){
            this.x = -this.focus.x;
            this.y = -this.focus.y;
            this.z = -this.focus.z;

            this.rotation.x = -this.focus.rotation.x;
            this.rotation.y = -this.focus.rotation.y;
            this.rotation.z = -this.focus.rotation.z;
        }

        mat4.identity(this.pMatrix);
        mat4.perspective(this.pMatrix, this.fieldOfView, this.gl.viewportWidth / this.gl.viewportHeight, this.nearClip, this.farClip);
        mat4.translate(this.pMatrix, this.pMatrix, [0.0, 0.0, this.distance.z]);

        mat4.rotate(this.pMatrix, this.pMatrix, this.rotation.x, [1.0, 0.0, 0.0]);
        mat4.rotate(this.pMatrix, this.pMatrix, this.rotation.y+Math.PI, [0.0, 1.0, 0.0]);

        mat4.translate(this.pMatrix, this.pMatrix, [0.0, this.distance.y, 0.0]);

        mat4.translate(this.pMatrix, this.pMatrix, [this.x, this.y, this.z]);

        this.gl.uniformMatrix4fv(Shader.shaderProgram.pMatrixUniform, false, this.pMatrix);

    }

    lookAt(entity) {
        this.focus = entity;
        console.log("Camera: focus changed to", entity.options.name);
    }

    draw() {

    }

    screenToWorld() {

    }

    worldToScreen() {

    }


}
