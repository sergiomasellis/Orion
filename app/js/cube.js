import Entity from "Orion/Entity";
import Utils from "Orion/Utils";
import Resources from 'Orion/Resource';
import Injector from 'Orion/Injector';

class Cube extends Entity {

    init() {
        //variables
        this.mvMatrix = mat4.create();
        this.pMatrix = mat4.create();
        this.vertextPositionBuffer = null;

        //init
        this.gl = Injector.dependencies.gl;
        this.initShaders(this.gl);
        this.initBuffers(this.gl);

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);

        this.speed = 0.05;
        this.angle = 0;
        this.range = 0.5;
        this.x = Math.random()*this.gl.width;
        this.y = Math.random()*this.gl.height;

    }

    initShaders(gl){

        //get shaders from html script tag
        this.fragmentShader = Utils.getShader(gl, 'shader-fs');
        this.vertextShader = Utils.getShader(gl, 'shader-vs');

        //create gl program
        this.shaderProgram = gl.createProgram();
        gl.attachShader(this.shaderProgram, this.vertextShader);
        gl.attachShader(this.shaderProgram, this.fragmentShader);
        gl.linkProgram(this.shaderProgram);

        if(!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)){
            throw new Error('Could not initialise shaders');
        }

        gl.useProgram(this.shaderProgram);

        this.shaderProgram.vertexPositionAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);

        this.shaderProgram.pMatrixUniform = gl.getUniformLocation(this.shaderProgram, "pMatrix");
        this.shaderProgram.mvMatrixUniform = gl.getUniformLocation(this.shaderProgram, "mVMatrix");

    }

    initBuffers(gl){

        // create buffer for vertices to be stored in
        this.vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);

        //vertices
        let vertices = [
             1.0, 1.0, 0.0, //v0
            -1.0, 1.0, 0.0, //v1
             1.0, -1.0, 0.0, //v2
            -1.0, -1.0, 0.0  //v3
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.vertexPositionBuffer.itemSize = 3;
        this.vertexPositionBuffer.numItems = 4;

    }

    setMatrixUniforms() {
        this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
        this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);
    }


    update() {

    }

    draw() {

        var gl = this.gl;

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


        mat4.perspective(40, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0, this.pMatrix);
        mat4.identity(this.mvMatrix);
        
        this.angle += this.speed;
        this.currentPosition = (this.currentPosition + 0.01);
        mat4.translate(this.mvMatrix, [0.0, 0.0, -7.0+Math.sin(this.angle) * this.range]);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        this.setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.vertexPositionBuffer.numItems);

    }
}

export default Cube;
