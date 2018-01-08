import Injector from "./Injector";
import Utils from "./Utils";
import Shader from "./Shader";

class Program {
  constructor(options = {}) {
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
    Injector.register(this.name + "Program", this);

    // attach vert shader
    Injector.get("gl").attachShader(this.shaderProgram, Shader.shaderCache.get(this.vertShader));

    // attach frag shader
    Injector.get("gl").attachShader(this.shaderProgram, Shader.shaderCache.get(this.fragShader));

    // Link Gl program to the webgl context
    Injector.get("gl").linkProgram(this.shaderProgram);

    // use program created
    // this.use();

    if (!Injector.get("gl").getProgramParameter(this.shaderProgram, Injector.get("gl").LINK_STATUS)) {
      throw new Error("Program: Could not initialise shaders");
      this.reject();
    } else {
      console.log("Program: " + this.name + " compiled", this.shaderProgram);
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
    this.shaderProgram.color = Injector.get("gl").getUniformLocation(this.shaderProgram, "color");
    this.shaderProgram.pMatrixUniform = Injector.get("gl").getUniformLocation(this.shaderProgram, "pMatrix");
    this.shaderProgram.mvMatrixUniform = Injector.get("gl").getUniformLocation(this.shaderProgram, "mVMatrix");
    this.shaderProgram.samplerUniform = Injector.get("gl").getUniformLocation(this.shaderProgram, "uSampler");
  }

  attributes() {
    this.shaderProgram.position = Injector.get("gl").getAttribLocation(this.shaderProgram, "position");
    Injector.get("gl").enableVertexAttribArray(this.shaderProgram.position);

    this.shaderProgram.uv = Injector.get("gl").getAttribLocation(this.shaderProgram, "uv");
    Injector.get("gl").enableVertexAttribArray(this.shaderProgram.uv);

    this.shaderProgram.vColor = Injector.get("gl").getAttribLocation(this.shaderProgram, "aVertexColor");
    Injector.get("gl").enableVertexAttribArray(this.shaderProgram.vColor);

    this.shaderProgram.normals = Injector.get("gl").getAttribLocation(this.shaderProgram, "normals");
    Injector.get("gl").enableVertexAttribArray(this.shaderProgram.normals);
  }
}

export default Program;
