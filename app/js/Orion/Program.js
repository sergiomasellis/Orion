import Injector from 'Orion/Injector';
import Utils from 'Orion/Utils';

class Program {

	constructor(options = {}){

        Utils.extend(this.options, options);
		this.name = this.options.name || "base";
	
		this.init();
	}

	// Used to compile the shaders in the cache
    init() {

        console.log("Program: Creating Programs and Linking");

        //create gl program
        this.shaderProgram = Injector.get("gl").createProgram();

        //attach the shaders to the program
        for (var shader in this.shaderCache) {
            if (this.shaderCache.hasOwnProperty(shader)) {
                Injector.get("gl").attachShader(this.shaderProgram, this.shaderCache[shader]);
            }
        }

        Injector.get("gl").linkProgram(this.shaderProgram);

        // use program created
        this.use();

        if (!Injector.get("gl").getProgramParameter(this.shaderProgram, Injector.get("gl").LINK_STATUS)) {
            throw new Error('Program: Could not initialise shaders');
            // this.reject();
            Injector.register("DUDE", "dude");
        } else {
            console.log("Program: Program compiled");
            // this.resolve();
        }
    }

    use() {
        //once buffer is setup use program
        Injector.get("gl").useProgram(this.use);

        //setup uniforms/attributes
        this.uniforms();
        this.attributes();
    }

    uniforms() {

        //get color uniform
        this.shaderProgram.color = Injector.get("gl").getUniformLocation(this.shaderProgram, 'color');
        this.shaderProgram.pMatrixUniform = Injector.get("gl").getUniformLocation(this.shaderProgram, "pMatrix");
        this.shaderProgram.mvMatrixUniform = Injector.get("gl").getUniformLocation(this.shaderProgram, "mVMatrix");
        this.shaderProgram.samplerUniform = Injector.get("gl").getUniformLocation(this.shaderProgram, "uSampler");
        this.shaderProgram.uSunPosUniform = Injector.get("gl").getUniformLocation(this.shaderProgram, "uSunPos");

    }

    attributes() {

        this.shaderProgram.position = Injector.get("gl").getAttribLocation(this.shaderProgram, 'position');
        Injector.get("gl").enableVertexAttribArray(this.shaderProgram.position);    

        this.shaderProgram.uv = Injector.get("gl").getAttribLocation(this.shaderProgram, 'uv');
        Injector.get("gl").enableVertexAttribArray(this.shaderProgram.uv);

        this.shaderProgram.vColor = Injector.get("gl").getAttribLocation(this.shaderProgram, 'aVertexColor');
        Injector.get("gl").enableVertexAttribArray(this.shaderProgram.vColor);

        this.shaderProgram.normals = Injector.get("gl").getAttribLocation(this.shaderProgram, 'normals');
        Injector.get("gl").enableVertexAttribArray(this.shaderProgram.normals);

    }

}

export default Program;