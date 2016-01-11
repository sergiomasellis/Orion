import Injector from 'Orion/Injector';


class Shader {

    constructor() {
        this.shaderCache = {};
        this.shaderCompiled = {};
        this.allShaderCompiled = false;
    }

    load(multipleArrayOfShaders) {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;

            for (let item of multipleArrayOfShaders) {
                this._load(item[1], item[0]); // go through array pass TYPE and URL
            }
        });
    }

    _load(url, type) {
        console.log("Shader: Fetching - ", url);

        let id = url;
        // split out the slashes from url
        // split out the .glsl
        id = id.split("/");
        id = id[id.length - 1].split(".")[0];

        this.shaderCompiled[id] = {};
        this.shaderCompiled[id].ready = false;


        // ELSE GO GET THE SHADER
        let shaderRequest = new XMLHttpRequest(),
            shaderResponse = false;

        shaderRequest.onreadystatechange = () => {
            if (shaderRequest.readyState == 4 && shaderRequest.status == 200) {
                this.shaderCache[id] = shaderRequest.responseText;

                console.log("Shader: Added to cache: " + url);

                this.compileShader(id, shaderRequest.responseText, type, (completeShaderId, shader) => {

                    // cache the shader for use in other classes
                    this.shaderCache[completeShaderId] = shader;

                    // if all shaders are compiled call every callback
                    this.shaderCompiled[completeShaderId].ready = true;

                    // debugger;
                    //check if all are completed
                    if (this.isReady()) {
                        console.log("Shader: All Shaders compiled");
                        this.resolve();
                    }

                }.bind(this));


                return shaderResponse;
            }

        }.bind(this);

        shaderRequest.open("GET", url, true);
        shaderRequest.send();
    }

    isReady(){
        this.allShaderCompiled = true;
        for (let prop in this.shaderCompiled) {
            if (this.shaderCompiled.hasOwnProperty(prop)) {
                if (this.shaderCompiled[prop].ready == false) {
                    this.allShaderCompiled = false;
                    break;
                }
            }
        }
        return this.allShaderCompiled;
    }



    compileShader(url, shaderText, type, cb) {

        let shader;
        if (type == "frag") {
            shader = Injector.get("gl").createShader(Injector.get("gl").FRAGMENT_SHADER);
        } else if (type == "vert") {
            shader = Injector.get("gl").createShader(Injector.get("gl").VERTEX_SHADER);
        } else {
            return null;
        }

        // debugger;
        Injector.get("gl").shaderSource(shader, shaderText);
        Injector.get("gl").compileShader(shader);

        if (!Injector.get("gl").getShaderParameter(shader, Injector.get("gl").COMPILE_STATUS)) {
            console.error(Injector.get("gl").getShaderInfoLog(shader));
            return null;
        } else {
            //when success
            cb(url, shader);
        }

    }
}

export default new Shader;