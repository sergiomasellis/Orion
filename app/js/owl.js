
import Shader from 'Orion/Shader';
import Models from 'Orion/Model';
import frinlet from "frinlet";


class Owl extends frinlet{


	initBuffers(){

        if(!Models.bufferedModels["owl"]){

            // create buffer for vertices to be stored in
            this.vertexPositionBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexPositionBuffer);

            //vertices
            let vertices = new Float32Array(Models.modelCache["owl"].verts);

            this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

            //once buffer is setup use program
            this.gl.useProgram(Shader.shaderProgram);

            //setup uniforms/attributes
            this.setupUniformsNAttribs(this.gl);

            // this should be
            this.vertexPositionBuffer.itemSize = 3;
            this.vertexPositionBuffer.numItems = vertices.length/this.vertexPositionBuffer.itemSize;

            Models.bufferedModels["owl"] = this.vertexPositionBuffer;
        }else{
            this.vertexPositionBuffer = Models.bufferedModels["owl"];
        }
    }

    draw() {


          this.gl.uniform4fv(Shader.shaderProgram.color, this.color);

          mat4.perspective(this.pMatrix, 40, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 1000.0);
          mat4.identity(this.mvMatrix);

          this.speed += 0.1;
          // sets z to -7                                x    y     z (up and down)
          mat4.translate(this.mvMatrix, this.mvMatrix, [this.x+Math.sin(this.speed), 0.0, -4.0+this.z]);
          // mat4.rotate(this.mvMatrix, this.mvMatrix, new Date().getTime()/400, [0.0, 1.0, 0.0]);

          this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
          this.gl.vertexAttribPointer(Shader.shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

          this.setMatrixUniforms(this.gl);

          this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexPositionBuffer.numItems);
          window.polys += this.vertexPositionBuffer.numItems/3;
    }

}

export default Owl;