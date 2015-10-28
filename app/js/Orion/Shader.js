import Injector from 'Orion/Injector';

export default class Shader {

  constructor(){
    this.shaderCache = {};
    this.shaderCompiled = {};
    this.allShaderCompiled = false;
    this.readyCallbacks = [];
    this.gl = Injector.dependencies.gl;

    // console.log("Shader Class Started");
  }

  load(multipleArrayOfShaders){
      for(let item of multipleArrayOfShaders) {
        this._load(item[0], item[1]); // go through array pass URL and TYPE
      }
  }

  _load(url, type){
      console.log("Fetching Resource From:", url);

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


            console.log("Added to cache: "+url);

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
                console.log("ALL Shaders compiled");
                this.readyCallbacks.forEach((func) => {
                    func();
                }.bind(this));
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

    console.log("Compiling Shader of type: ", type);

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

  isReady(){
        console.log("A Shader is Ready");
        var ready = true;
        for(var k in this.shaderCache){
            if(this.shaderCache.hasOwnProperty(k) && !this.shaderCache[k]){
                ready = false;
            }
        }
        return ready;
  }

  onReady(func){
    this.readyCallbacks.push(func);
  }
}
