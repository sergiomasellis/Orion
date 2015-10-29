import Entity from "Orion/Entity";
import Utils from "Orion/Utils";
import Resources from 'Orion/Resource';

import Shader from 'Orion/Shader';
import Injector from 'Orion/Injector';
import Models from 'Orion/Model';
import Texture from 'Orion/Texture';

class frinlet extends Entity {

    init() {
        //variables
        this.mvMatrix = mat4.create();
        this.pMatrix = mat4.create();
        this.vertextPositionBuffer = null;

        // Get GL from injector
        this.gl = Injector.dependencies.gl;
        this.controller = Injector.dependencies.controller;

        // Run only after shaders are ready!
        this.initBuffers();

        this.speed = this.speed || 0.05;
        this.angle = 0;
        this.range = 0.5;
        this.color = [Math.random(), Math.random(), Math.random(), 1.0];
    }

    initBuffers(){


        if(!Models.bufferedModels["frinlet"]){

            // create buffer for vertices to be stored in
            this.vertexPositionBuffer = this.gl.createBuffer();
            this.uvBuffer = this.gl.createBuffer();


            // vertices
            let vertices = new Float32Array(Models.modelCache["frinlet"].verts);
            let uvs = new Float32Array(Models.modelCache["frinlet"].uv);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.uvBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, uvs, this.gl.STATIC_DRAW);

            //once buffer is setup use program
            this.gl.useProgram(Shader.shaderProgram);

            //setup uniforms/attributes
            this.setupUniformsNAttribs(this.gl);

            // this should be
            this.vertexPositionBuffer.itemSize = 3;
            this.vertexPositionBuffer.numItems = vertices.length/this.vertexPositionBuffer.itemSize;

            Models.bufferedModels["frinlet"] = this.vertexPositionBuffer;
        }else{
            this.vertexPositionBuffer = Models.bufferedModels["frinlet"];
        }
    


        // console.log("Cube: InitBuffers");
    }

    setupUniformsNAttribs(gl) {

      //get color uniform
      Shader.shaderProgram.color = gl.getUniformLocation(Shader.shaderProgram, 'color');


      //set color r,g,b,a
      gl.uniform4fv(Shader.shaderProgram.color, [Math.random(), Math.random(), Math.random(), 1.0]);

      Shader.shaderProgram.position = gl.getAttribLocation(Shader.shaderProgram, 'position');
      gl.enableVertexAttribArray(Shader.shaderProgram.position); // <--- ?
      gl.vertexAttribPointer(Shader.shaderProgram.position, 3, gl.FLOAT, false, 0, 0);      

      Shader.shaderProgram.uv = gl.getAttribLocation(Shader.shaderProgram, 'uv');
      gl.enableVertexAttribArray(Shader.shaderProgram.uv); // <--- ?
      gl.vertexAttribPointer(Shader.shaderProgram.uv, 2, gl.FLOAT, false, 0, 0);

      Shader.shaderProgram.pMatrixUniform = gl.getUniformLocation(Shader.shaderProgram, "pMatrix");
      Shader.shaderProgram.mvMatrixUniform = gl.getUniformLocation(Shader.shaderProgram, "mVMatrix");
      Shader.shaderProgram.samplerUniform = gl.getUniformLocation(Shader.shaderProgram, "uSampler");

    }

    setMatrixUniforms(gl) {
      gl.uniformMatrix4fv(Shader.shaderProgram.pMatrixUniform, false, this.pMatrix);
      gl.uniformMatrix4fv(Shader.shaderProgram.mvMatrixUniform, false, this.mvMatrix);
      gl.uniform1i(Shader.shaderProgram.samplerUniform, 0);
    }

    update() {

      if (this.controller.direction.W) {
          this.z -= this.speed;
      }

      if (this.controller.direction.S) {
          this.z += this.speed;
      }

      if (this.controller.direction.A) {
          this.x -= this.speed;
      }

      if (this.controller.direction.D) {
          this.x += this.speed;
      }
      
    }

    draw() {

          this.gl.uniform4fv(Shader.shaderProgram.color, this.color);

          mat4.perspective(this.pMatrix, 40, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 1000.0);
          mat4.identity(this.mvMatrix);

          // sets z to -7                                x    y     z (up and down)
          mat4.translate(this.mvMatrix, this.mvMatrix, [this.x, 0.0, -2.0+this.z]);
          mat4.rotate(this.mvMatrix, this.mvMatrix, new Date().getTime()/400, [0.0, 1.0, 0.0]);

          this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
          this.gl.vertexAttribPointer(Shader.shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

          this.gl.activeTexture(this.gl.TEXTURE0);
          this.gl.bindTexture(this.gl.TEXTURE_2D, Texture.textureCache['character']);

          this.setMatrixUniforms(this.gl);

          this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexPositionBuffer.numItems);
          window.polys += this.vertexPositionBuffer.numItems/3;
    }
}

export default frinlet;
