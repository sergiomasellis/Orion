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

                        this.initProgram();
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

        // return shader;
    }

    // Used to compile the shaders in the cache
    initProgram() {

        console.log("Shader: Creating Programs and Linking");

        //create gl program
        this.shaderProgram = Injector.get("gl").createProgram();

        //attach the shaders to the program
        for (var shader in this.shaderCache) {
            if (this.shaderCache.hasOwnProperty(shader)) {
                Injector.get("gl").attachShader(this.shaderProgram, this.shaderCache[shader]);
            }
        }

        Injector.get("gl").linkProgram(this.shaderProgram);

        this.useProgram();

        if (!Injector.get("gl").getProgramParameter(this.shaderProgram, Injector.get("gl").LINK_STATUS)) {
            throw new Error('Shader: Could not initialise shaders');
            this.reject();
        } else {
            console.log("Shader: Program compiled");
            this.resolve();
        }
    }

    useProgram() {
        //once buffer is setup use program
        Injector.get("gl").useProgram(this.shaderProgram);
        //setup uniforms/attributes
        this.setupUniformsNAttribs();
    }

    setupUniformsNAttribs() {

        //get color uniform
        this.shaderProgram.color = Injector.get("gl").getUniformLocation(this.shaderProgram, 'color');

        this.shaderProgram.position = Injector.get("gl").getAttribLocation(this.shaderProgram, 'position');
        Injector.get("gl").enableVertexAttribArray(this.shaderProgram.position); // <--- ?    

        this.shaderProgram.uv = Injector.get("gl").getAttribLocation(this.shaderProgram, 'uv');
        Injector.get("gl").enableVertexAttribArray(this.shaderProgram.uv); // <--- ?

        this.shaderProgram.vColor = Injector.get("gl").getAttribLocation(this.shaderProgram, 'aVertexColor');
        Injector.get("gl").enableVertexAttribArray(this.shaderProgram.vColor); // <--- ?

        this.shaderProgram.normals = Injector.get("gl").getAttribLocation(this.shaderProgram, 'normals');
        Injector.get("gl").enableVertexAttribArray(this.shaderProgram.normals); // <--- ?

        this.shaderProgram.pMatrixUniform = Injector.get("gl").getUniformLocation(this.shaderProgram, "pMatrix");
        this.shaderProgram.mvMatrixUniform = Injector.get("gl").getUniformLocation(this.shaderProgram, "mVMatrix");
        this.shaderProgram.samplerUniform = Injector.get("gl").getUniformLocation(this.shaderProgram, "uSampler");

    }
}

export default new Shader;