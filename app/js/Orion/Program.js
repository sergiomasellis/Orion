import Injector from 'Orion/Injector';
import Utils from 'Orion/Utils';
import Shader from 'Orion/Shader';

class Program {

	constructor(options = {}){

        //merge it
        this.options = Utils.extend(this.options, options);

        this.name = this.options.name || "base";

        this.vertShader = this.options.vertShader || "vert";
        this.fragShader = this.options.fragShader || "frag";

        this.shaderProgram = null;

		return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;

            this.init();
        });
	}

	// Used to compile the shaders in the cache
    init() {

        console.log("Program: Linking and Creating Program", this.name);

        //create gl program
        this.shaderProgram = Injector.get("gl").createProgram();

        // Register program
        Injector.register(this.name+"Program", this.shaderProgram);


        //attach the shaders to the program
        // for (var shader in Shader.shaderCache) {
        //     if (Shader.shaderCache.hasOwnProperty(shader)) {
                // Injector.get("gl").attachShader(this.shaderProgram, Shader.shaderCache[shader]);
        //     }
        // }

        debugger;

        // attach vert shader
        Injector.get("gl").attachShader(this.shaderProgram, Shader.shaderCache[this.vertShader]);

        // attach frag shader
        Injector.get("gl").attachShader(this.shaderProgram, Shader.shaderCache[this.fragShader]);




        Injector.get("gl").linkProgram(this.shaderProgram);

        // use program created
        this.use();

        if (!Injector.get("gl").getProgramParameter(this.shaderProgram, Injector.get("gl").LINK_STATUS)) {
            throw new Error('Program: Could not initialise shaders');
            this.reject();
        } else {
            console.log("Program: "+this.name+" compiled");
            this.resolve();
        }
    }

    use() {
        //once buffer is setup use program
        Injector.get("gl").useProgram(this.shaderProgram);

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
        // this.shaderProgram.uSunPosUniform = Injector.get("gl").getUniformLocation(this.shaderProgram, "uSunPos");

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