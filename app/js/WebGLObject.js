import Entity from "Orion/Entity";
import Utils from "Orion/Utils";
import Injector from 'Orion/Injector';


import Shader from 'Orion/Shader';
import Models from 'Orion/Model';
import Texture from 'Orion/Texture';

class WebGLObject extends Entity {

    init() {

        // variables
        this.mvMatrix = mat4.create();
        this.pMatrix = mat4.create();
        this.texture = this.options.texture || false;
        this.model = this.options.model || "cube";
        this.playable = this.options.playable || false;

        // movement Variable
        this.speed = this.options.speed || 0.05;
        this.angle = this.options.angle || 0;
        this.range = this.options.range || 0.5;
        this.color = this.options.color || [1.0, 1.0, 1.0, 1.0];

        // Get GL from injector and controller if needed
        this.gl = Injector.dependencies.gl;
        this.controller = Injector.dependencies.controller;

        // Run only after shaders are ready!
        this.vertexPositionBuffer = (!Models.bufferedModels[this.model]) ? this.initBuffers() : Models.bufferedModels[this.model];

    }

    initBuffers(){

        // create buffer for vertices to be stored in
        let vertBuffer = this.gl.createBuffer();
        this.uvBuffer = this.gl.createBuffer();

        // vertices
        let vertices = new Float32Array(Models.modelCache[this.model].verts);
        let uvs = new Float32Array(Models.modelCache[this.model].uv);

        // bind vert buffers and add vertices to it
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.uvBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, uvs, this.gl.STATIC_DRAW);

        // this should be
        vertBuffer.itemSize = 3;
        vertBuffer.numItems = vertices.length/vertBuffer.itemSize;

        Models.bufferedModels[this.model] = vertBuffer;

        return vertBuffer;
    }

    setMatrixUniforms(gl) {
      gl.uniformMatrix4fv(Shader.shaderProgram.mvMatrixUniform, false, this.mvMatrix);
      gl.uniform1i(Shader.shaderProgram.samplerUniform, Texture.textureCache[this.options.texture].id);
    }

    update() {

      if (this.controller.direction.W) {
          this.x += this.speed * Math.cos(this.rotation.y-Math.PI/2);
          this.z -= this.speed * Math.sin(this.rotation.y-Math.PI/2);
      }

      if (this.controller.direction.S) {
          this.x -= this.speed * Math.cos(this.rotation.y-Math.PI/2);
          this.z += this.speed * Math.sin(this.rotation.y-Math.PI/2);
      }

      if (this.controller.direction.A) {
          this.rotation.y += this.speed;
      }

      if (this.controller.direction.D) {
          this.rotation.y -= this.speed;
      }
      
    }

    draw() {

          this.gl.uniform4fv(Shader.shaderProgram.color, this.color);

          mat4.identity(this.mvMatrix);
          mat4.translate(this.mvMatrix, this.mvMatrix, [this.x, 0.0, this.z]);

          if(this.playable){

            this.color = [1,0,0, 0.5];

            mat4.identity(this.pMatrix);
            mat4.perspective(this.pMatrix, Math.PI*0.3, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 1000.0);
            mat4.translate(this.pMatrix, this.pMatrix, [0.0, -4.0, -7.0]);

            // mat4.rotate(this.pMatrix, this.pMatrix, -this.rotation.y+Math.PI, [0.0, 1.0, 0.0]); //later D:
            mat4.rotate(this.pMatrix, this.pMatrix, -this.rotation.y+Math.PI, [0.0, 1.0, 0.0]);
            mat4.translate(this.pMatrix, this.pMatrix, [-this.x, 0.0, -this.z]);


            this.gl.uniformMatrix4fv(Shader.shaderProgram.pMatrixUniform, false, this.pMatrix);

          }else{
              this.x += (0.3 * Math.sin(this.z))/8;
              this.z += (0.3 * Math.cos(this.x))/8;
          }

          mat4.rotate(this.mvMatrix, this.mvMatrix, this.rotation.y, [0.0, 1.0, 0.0]);

          this.gl.activeTexture(this.gl.TEXTURE0+Texture.textureCache[this.options.texture].id);

          this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
          this.gl.vertexAttribPointer(Shader.shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);


          this.setMatrixUniforms(this.gl);
          this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexPositionBuffer.numItems);
    }
}

export default WebGLObject;
