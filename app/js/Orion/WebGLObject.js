import Entity from "./Entity";
import Injector from './Injector';
// import Shader from 'Orion/Shader';
import Program from './Program';
import Models from './Model';
import Texture from './Texture';
import Utils from './Utils';

class WebGLObject extends Entity {

    init(options = {}) {
        //merge it
        this.options = Utils.extend(this.options, options);

        // variables
        this.mvMatrix = mat4.create();
        this.texture = this.options.texture || "base";
        this.model = this.options.model || this.model || "cube";
        this.playable = this.options.playable || false;

        // movement Variable
        this.speed = this.options.speed || 8.05;
        this.color = this.options.color || [1.0, 1.0, 1.0, 1.0];
        this.scale = this.options.scale || {x:1, y:1, z:1};
        this.theta = 0;

        this.programName = this.options.programName || "baseProgram";

        // Run only after shaders are ready!
        if (!Models.bufferedModels[this.model]) this.initBuffers();
    }

    initBuffers() {

        Injector.dependencies.gl.activeTexture(Injector.dependencies.gl.TEXTURE0 + Texture.textureCache[this.texture].id);
        Injector.dependencies.gl.bindTexture(Injector.dependencies.gl.TEXTURE_2D, Texture.textureCache[this.texture].compiledTexture);

        // create buffer for vertices to be stored in
        let vertBuffer = Injector.dependencies.gl.createBuffer();
        let uvBuffer = Injector.dependencies.gl.createBuffer();
        let colorBuffer = Injector.dependencies.gl.createBuffer();
        let normalBuffer = Injector.dependencies.gl.createBuffer();
        let polyCount = Models.modelCache[this.model].verts.length/3;

        // sergio is awesome fsdfs
        //check
        if(Models.modelCache[this.model].vColor === undefined) {
            Models.modelCache[this.model].vColor = Utils.fillArrayWith([1,1,1], polyCount);
        }

        if(Models.modelCache[this.model].normals === undefined) {
            Models.modelCache[this.model].normals = Utils.fillArrayWith([0,0,0], polyCount);
        }

        if(Models.modelCache[this.model].uv === undefined) {
            Models.modelCache[this.model].uv = Utils.fillArrayWith([0,0,0], polyCount*(2/3));
        }

        // vertices
        let vertices = new Float32Array(Models.modelCache[this.model].verts);
        let uvs = new Float32Array(Models.modelCache[this.model].uv);
        let normals = new Float32Array(Models.modelCache[this.model].normals);
        let colors = new Float32Array(Models.modelCache[this.model].vColor);

        // bind vert buffers and add vertices to it
        Injector.dependencies.gl.bindBuffer(Injector.dependencies.gl.ARRAY_BUFFER, vertBuffer);
        Injector.dependencies.gl.bufferData(Injector.dependencies.gl.ARRAY_BUFFER, vertices, Injector.dependencies.gl.STATIC_DRAW);

        // bind uv buffer
        Injector.dependencies.gl.bindBuffer(Injector.dependencies.gl.ARRAY_BUFFER, uvBuffer);
        Injector.dependencies.gl.bufferData(Injector.dependencies.gl.ARRAY_BUFFER, uvs, Injector.dependencies.gl.STATIC_DRAW);

        // bind color buffer
        Injector.dependencies.gl.bindBuffer(Injector.dependencies.gl.ARRAY_BUFFER, colorBuffer);
        Injector.dependencies.gl.bufferData(Injector.dependencies.gl.ARRAY_BUFFER, colors, Injector.dependencies.gl.STATIC_DRAW);

        // bind normals buffer
        Injector.dependencies.gl.bindBuffer(Injector.dependencies.gl.ARRAY_BUFFER, normalBuffer);
        Injector.dependencies.gl.bufferData(Injector.dependencies.gl.ARRAY_BUFFER, normals, Injector.dependencies.gl.STATIC_DRAW);

        // this should be
        vertBuffer.itemSize = 3;
        vertBuffer.numItems = vertices.length / vertBuffer.itemSize;

        Models.bufferedModels[this.model] = {};
        Models.bufferedModels[this.model].numItems = vertBuffer.numItems;
        Models.bufferedModels[this.model].verts = vertBuffer;
        Models.bufferedModels[this.model].uvs = uvBuffer;
        Models.bufferedModels[this.model].vColor = colorBuffer;
        Models.bufferedModels[this.model].normals = normalBuffer;

    }

    update() {
       
    }

    draw() {
        // console.log(Injector.get(this.programName));
         Injector.get(this.programName).use();



        if(this.programName === "baseProgram"){
            Injector.dependencies.gl.uniform4fv(Injector.get(this.programName).shaderProgram.color, this.color);

            mat4.identity(this.mvMatrix);
            mat4.translate(this.mvMatrix, this.mvMatrix, [this.x, 0.0, this.z]);
            mat4.scale(this.mvMatrix, this.mvMatrix, [this.scale.x, this.scale.y, this.scale.z]);
            mat4.rotate(this.mvMatrix, this.mvMatrix, this.rotation.y, [0.0, 1.0, 0.0]);
            mat4.rotate(this.mvMatrix, this.mvMatrix, this.rotation.x, [1.0, 0.0, 0.0]);
            mat4.rotate(this.mvMatrix, this.mvMatrix, this.rotation.z, [0.0, 0.0, 1.0]);

            Injector.dependencies.gl.activeTexture(Injector.dependencies.gl.TEXTURE0 + Texture.textureCache[this.texture].id);

            Injector.dependencies.gl.bindBuffer(Injector.dependencies.gl.ARRAY_BUFFER, Models.bufferedModels[this.model].verts);
            Injector.dependencies.gl.vertexAttribPointer(Injector.get(this.programName).shaderProgram.position, 3, Injector.dependencies.gl.FLOAT, false, 0, 0);

            Injector.dependencies.gl.bindBuffer(Injector.dependencies.gl.ARRAY_BUFFER, Models.bufferedModels[this.model].uvs);
            Injector.dependencies.gl.vertexAttribPointer(Injector.get(this.programName).shaderProgram.uv, 2, Injector.dependencies.gl.FLOAT, false, 0, 0);

            Injector.dependencies.gl.bindBuffer(Injector.dependencies.gl.ARRAY_BUFFER, Models.bufferedModels[this.model].vColor);
            Injector.dependencies.gl.vertexAttribPointer(Injector.get(this.programName).shaderProgram.vColor, 3, Injector.dependencies.gl.FLOAT, false, 0, 0);

            Injector.dependencies.gl.bindBuffer(Injector.dependencies.gl.ARRAY_BUFFER, Models.bufferedModels[this.model].normals);
            Injector.dependencies.gl.vertexAttribPointer(Injector.get(this.programName).shaderProgram.normals, 3, Injector.dependencies.gl.FLOAT, false, 0, 0);

            Injector.dependencies.gl.uniformMatrix4fv(Injector.get(this.programName).shaderProgram.mvMatrixUniform, false, this.mvMatrix);
            Injector.dependencies.gl.uniform1i(Injector.get(this.programName).shaderProgram.samplerUniform, Texture.textureCache[this.texture].id);
        } else {
            this.theta += 0.0125;
            Injector.dependencies.gl.uniform3fv(Injector.get(this.programName).uSunPosUniform, [0, Math.cos(this.theta) * 0.3 + 0.2, -1]);
    
            Injector.dependencies.gl.bindBuffer(Injector.dependencies.gl.ARRAY_BUFFER, Models.bufferedModels[this.model].verts);
            Injector.dependencies.gl.vertexAttribPointer(Injector.get(this.programName).shaderProgram.position, 3, Injector.dependencies.gl.FLOAT, false, 0, 0);
        }

        // draw to canvas
        Injector.dependencies.gl.drawArrays(Injector.dependencies.gl.TRIANGLES, 0, Models.bufferedModels[this.model].numItems);
    }
}

export default WebGLObject;
