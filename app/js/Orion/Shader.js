import Injector from 'Orion/Injector';


class Shader {

  constructor(){
    this.shaderCache = {};
    this.shaderCompiled = {};
    this.allShaderCompiled = false;
    this.readyCallbacks = [];
  }

  init(){
    this.gl = Injector.dependencies.gl;
    return this;
  }

  load(multipleArrayOfShaders){
      for(let item of multipleArrayOfShaders) {
        this._load(item[0], item[1]); // go through array pass URL and TYPE
      }
  }

  _load(url, type){
      console.log("Shader: Fetching - ", url);

      let id = url;

      // split out the slashes from url
      // split out the .glsl
      // id = (id.split("/"))[2].split(".")[0];
      id = id.split("/");
      id = id[id.length-1].split(".")[0];

      this.shaderCompiled[id] = {};
      this.shaderCompiled[id].ready = false;

      if(this.shaderCache[id]){
          return this.shaderCache[id]; // return compiled shader
      }else{
        // ELSE GO GET THE SHADER
        let shaderRequest =  new XMLHttpRequest(),
            shaderResponse = false;

        shaderRequest.onreadystatechange = () => {
          if (shaderRequest.readyState == 4 && shaderRequest.status == 200) {
            this.shaderCache[id] = shaderRequest.responseText;

            // debugger;


            console.log("Shader: Added to cache: "+url);

            this.compileShader(id, shaderRequest.responseText, type, (completeShaderId, shader) => {

              // cache the shader for use in other classes
              this.shaderCache[completeShaderId] = shader;

              // if all shaders are compiled call every callback
              this.shaderCompiled[completeShaderId].ready = true;

              // debugger;
              //check if all are completed
              this.allShaderCompiled = true;
              for (var prop in this.shaderCompiled) {
                if (this.shaderCompiled.hasOwnProperty(prop)) {
                  if(this.shaderCompiled[prop].ready == false){
                     this.allShaderCompiled = false;
                     break;
                  }
                }
              }

              if(this.allShaderCompiled){
                console.log("Shader: All Shaders compiled");

                this.initProgram();
              }

            }.bind(this));


            return shaderResponse;
          }

        }.bind(this);

        shaderRequest.open("GET", url, true);
        shaderRequest.send();

      }
  }



  compileShader(url, shaderText, type, cb){

    let gl = this.gl;

    // console.log("Compiling Shader of type: ", type);

    let shader;
    if (type == "frag") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (type == "vert") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    // debugger;
    gl.shaderSource(shader, shaderText);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
    }else{
      //when success
      cb(url, shader);
    }

    // return shader;
  }


  onReady(func){
    this.readyCallbacks.push(func);
  }

  // Used to compile the shaders in the cache
  initProgram(){

    console.log("Shader: Creating Programs and Linking");

    let gl = this.gl;

    //create gl program
    this.shaderProgram = gl.createProgram();

    //attach the shaders to the program
    for(var shader in this.shaderCache){
        if(this.shaderCache.hasOwnProperty(shader)){
           gl.attachShader(this.shaderProgram, this.shaderCache[shader]);
        }
    }

    gl.linkProgram(this.shaderProgram);

    if(!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)){
        throw new Error('Shader: Could not initialise shaders');
    }else{
      console.log("Shader: Program compiled");
    }

    this.readyCallbacks.forEach((func) => {
        func();
    }.bind(this));
  }
}

export default new Shader;
