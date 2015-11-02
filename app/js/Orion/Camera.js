import Utils from 'Orion/Utils';
import Injector from 'Orion/Injector';
import Entity from "Orion/Entity";

import Shader from 'Orion/Shader';

export default class Camera extends Entity{

    init() {

        console.log(this.options.distance);
        
        this.canvas = Injector.dependencies.canvas;
        this.gl = Injector.dependencies.gl;

        this.nearClip = this.options.nearClip || 0.1;
        this.farClip = this.options.farClip || 1000.0;
        this.distance = this.options.distance || {x:0, y:0, z:0};
        // this.lookAt = this.options.lookAt || null;
        this.fieldOfView = this.options.fieldOfView || Math.PI*0.3;
        this.aspectRatio = this.options.aspectRatio || this.canvas.width / this.canvas.height;

        this.pMatrix = mat4.create();
    }

    update() {
  
        if(this.lookAt != null){
            this.x = -this.lookAt.x;
            this.y = -this.lookAt.y;
            this.z = -this.lookAt.z;

            this.rotation.x = -this.lookAt.rotation.x;
            this.rotation.y = -this.lookAt.rotation.y;
            this.rotation.z = -this.lookAt.rotation.z;
        }

        mat4.identity(this.pMatrix);
        mat4.perspective(this.pMatrix, this.fieldOfView, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 1000.0);
        mat4.translate(this.pMatrix, this.pMatrix, [0.0, 0.0, this.distance.z]);

        mat4.rotate(this.pMatrix, this.pMatrix, this.rotation.x, [1.0, 0.0, 0.0]);
        mat4.rotate(this.pMatrix, this.pMatrix, this.rotation.y+Math.PI, [0.0, 1.0, 0.0]);

        mat4.translate(this.pMatrix, this.pMatrix, [0.0, this.distance.y, 0.0]);

        mat4.translate(this.pMatrix, this.pMatrix, [this.x, this.y, this.z]);

        this.gl.uniformMatrix4fv(Shader.shaderProgram.pMatrixUniform, false, this.pMatrix);

    }

    draw() {

    }

    screenToWorld() {

    }

    worldToScreen() {

    }


}
