import Entity from "Orion/Entity";
import Injector from 'Orion/Injector';
import Shader from 'Orion/Shader';
import Models from 'Orion/Model';
import Texture from 'Orion/Texture';
import Utils from 'Orion/Utils';

class WebGLObject extends Entity {

    init() {

        // variables
        this.mvMatrix = mat4.create();
        this.texture = this.options.texture || false;
        this.model = this.options.model || "cube";
        this.playable = this.options.playable || false;

        // movement Variable
        this.speed = this.options.speed || 8.05;
        this.turnRate = this.options.turnRate || 2.0;
        this.angle = this.options.angle || 0;
        this.range = this.options.range || 0.5;
        this.color = this.options.color || [1.0, 1.0, 1.0, 1.0];
        this.mouseSensitivity = this.options.mouseSensitivity || 200;

        // Get GL from injector and controller if needed
        this.gl = Injector.dependencies.gl;

        //hacky fix, change later
        this.gl.activeTexture(this.gl.TEXTURE0 + Texture.textureCache[this.texture].id);
        this.gl.bindTexture(this.gl.TEXTURE_2D, Texture.textureCache[this.texture].compiledTexture);

        // Run only after shaders are ready!
        if (!Models.bufferedModels[this.model]) this.initBuffers();


    }

    initBuffers() {


        // create buffer for vertices to be stored in
        let vertBuffer = this.gl.createBuffer();
        let uvBuffer = this.gl.createBuffer();
        let colorBuffer = this.gl.createBuffer();
        let normalBuffer = this.gl.createBuffer();
        let polyCount = Models.modelCache[this.model].verts.length/3;

        //check
        if(Models.modelCache[this.model].vColor === undefined) {
            Models.modelCache[this.model].vColor = Utils.fillArrayWith([1,1,1], polyCount);
        }

        if(Models.modelCache[this.model].normals === undefined) {
            Models.modelCache[this.model].normals = Utils.fillArrayWith([0,0,0], polyCount);
        }


        // vertices
        let vertices = new Float32Array(Models.modelCache[this.model].verts);
        let uvs = new Float32Array(Models.modelCache[this.model].uv);
        let normals = new Float32Array(Models.modelCache[this.model].normals);
        let colors = new Float32Array(Models.modelCache[this.model].vColor);

        // bind vert buffers and add vertices to it
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        // bind uv buffer 
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, uvBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, uvs, this.gl.STATIC_DRAW);

        // bind color buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, colors, this.gl.STATIC_DRAW);

        // bind normals buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normalBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, normals, this.gl.STATIC_DRAW);

        // this should be
        vertBuffer.itemSize = 3;
        vertBuffer.numItems = vertices.length / vertBuffer.itemSize;

        Models.bufferedModels[this.model] = {};
        Models.bufferedModels[this.model].numItems = vertBuffer.numItems;
        Models.bufferedModels[this.model].verts = vertBuffer;
        Models.bufferedModels[this.model].uvs = uvBuffer;
        Models.bufferedModels[this.model].vColor = colorBuffer;
        Models.bufferedModels[this.model].normals = normalBuffer;

        // console.log(Models.modelCache[this.model], Models.bufferedModels[this.model]);


    }

    update() {

    }

    draw() {

        this.gl.uniform4fv(Shader.shaderProgram.color, this.color);

        mat4.identity(this.mvMatrix);
        mat4.translate(this.mvMatrix, this.mvMatrix, [this.x, 0.0, this.z]);

        if (this.options.scale) mat4.scale(this.mvMatrix, this.mvMatrix, [this.options.scale, this.options.scale, this.options.scale]);

        mat4.rotate(this.mvMatrix, this.mvMatrix, this.rotation.y, [0.0, 1.0, 0.0]);

        this.gl.activeTexture(this.gl.TEXTURE0 + Texture.textureCache[this.options.texture].id);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, Models.bufferedModels[this.model].verts);
        this.gl.vertexAttribPointer(Shader.shaderProgram.position, 3, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, Models.bufferedModels[this.model].uvs);
        this.gl.vertexAttribPointer(Shader.shaderProgram.uv, 2, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, Models.bufferedModels[this.model].vColor);
        this.gl.vertexAttribPointer(Shader.shaderProgram.vColor, 3, this.gl.FLOAT, false, 0, 0);        

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, Models.bufferedModels[this.model].normals);
        this.gl.vertexAttribPointer(Shader.shaderProgram.normals, 3, this.gl.FLOAT, false, 0, 0);

        Injector.dependencies.controller.mouse.movement.x = 0;
        Injector.dependencies.controller.mouse.movement.y = 0;

        this.gl.uniformMatrix4fv(Shader.shaderProgram.mvMatrixUniform, false, this.mvMatrix);
        this.gl.uniform1i(Shader.shaderProgram.samplerUniform, Texture.textureCache[this.options.texture].id);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, Models.bufferedModels[this.model].numItems);
    }
}

export default WebGLObject;