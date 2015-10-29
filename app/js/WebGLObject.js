import Entity from "Orion/Entity";
import Utils from "Orion/Utils";
import Resources from 'Orion/Resource';

import Shader from 'Orion/Shader';
import Injector from 'Orion/Injector';
import Models from 'Orion/Model';
import Texture from 'Orion/Texture';

class WebGLObject extends Entity {

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
        this.color = [1.0, 1.0, 1.0, 1.0];


    }

    initBuffers(){


        if(!Models.bufferedModels[this.options.model]){

            // create buffer for vertices to be stored in
            this.vertexPositionBuffer = this.gl.createBuffer();
            this.uvBuffer = this.gl.createBuffer();


            // vertices
            let vertices = new Float32Array(Models.modelCache[this.options.model].verts);
            let uvs = new Float32Array(Models.modelCache[this.options.model].uv);

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

            Models.bufferedModels[this.options.model] = this.vertexPositionBuffer;
        }else{
            this.vertexPositionBuffer = Models.bufferedModels[this.options.model];
        }
    


        // console.log("Cube: InitBuffers");
    }

    setupUniformsNAttribs(gl) {

      //get color uniform
      Shader.shaderProgram.color = gl.getUniformLocation(Shader.shaderProgram, 'color');


      // //set color r,g,b,a
      // if(this.playable){
      //   gl.uniform4fv(Shader.shaderProgram.color, [1.0, 0.0, 0.0, 0.5]);
      // }else{
      //   gl.uniform4fv(Shader.shaderProgram.color, [1.0, 1.0, 1.0, 1.0]);
      // }

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
      gl.uniformMatrix4fv(Shader.shaderProgram.mvMatrixUniform, false, this.mvMatrix);
      gl.uniform1i(Shader.shaderProgram.samplerUniform, 0);
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

            // this.color = [1,0,0, 0.5];

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
          

          this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
          this.gl.vertexAttribPointer(Shader.shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

          this.gl.activeTexture(this.gl.TEXTURE0);

          this.gl.bindTexture(this.gl.TEXTURE_2D, Texture.textureCache[this.options.texture].compiledTexture);
          // console.log(Texture.textureCache);

          this.setMatrixUniforms(this.gl);

          this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexPositionBuffer.numItems);
          window.polys += this.vertexPositionBuffer.numItems/3;
    }
}

export default WebGLObject;
