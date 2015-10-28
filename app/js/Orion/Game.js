import Config from 'Orion/Config';
import Utils from 'Orion/Utils';
import Injector from 'Orion/Injector';
import Camera from 'Orion/Camera';
import Controller from 'Orion/Controller';

export default
class Game {
    constructor(options, dependencies) {
        this.dependencies = dependencies;
        this.options = Utils.extend(this.options, options);
        this.config = Config;

        this.init();

        // get shaders and compile them here
    }

    init() {

        //select canvas
        this.canvas = document.getElementById("mainCanvas");
        this.canvas.focus();

        //get 2d context
        this.context = (this.config.engine === "2d") ? this.canvas.getContext('2d') : this.canvas.getContext("webgl", {antialias: true}) || this.canvas.getContext("experimental-webgl");
        this.setScale = true;
        this.gl = this.context; //set webgl context

        //set canvas width
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;

        //set webgl viewport
        this.gl.viewportWidth = this.width;
        this.gl.viewportHeight = this.height;

        //clear color init
        // this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // this.gl.enable(this.gl.DEPTH_TEST);


        console.log("Orion Engine: ", this.config.engine);
        console.log("checking for gl", this.gl);
        //add instances to the injector
        Injector.register('canvas', this.canvas);
        Injector.register('context', this.context);
        Injector.register('gl', this.gl);


        //Select FPS div
        this.fpsContainer = document.getElementById("fps");

        //Timer for animation delta
        this.lastTime = 0;
        this.currentTime = 0;
        this.deltaTime = 0;

        //Initialize timer for FPS Calc
        this.startTime = Date.now();
        this.prevTime = this.startTime;

        //set default fps values
        this.fpsValue = 0;
        this.fpsMin = Infinity;
        this.fpsMax = 0;
        this.framesFps = 0;

        //List of Scenes
        this.sceneList = [];
        this.currentScene = 0;

        // //Scale
        // this.scale = 1;
        // Injector.register('scale', this.scale);

        //Create World Camera
        // this.camera = new Camera();
        // this.camera.zoomTo(300);
        // Injector.register('camera', this.camera);


        //setup keyboard controls
        this.controller = new Controller;
        Injector.register('controller', this.controller);

        //Initialize game loop
        this.raf();
    }

    // GAME LOOP FUNCTIONS
    raf() {
        this.currentTime = Date.now();
        this.deltaTime = (this.currentTime - this.lastTime) / 1000.0;

        //loop over update and draw functions
        this.timerBegin();
        this.update(this.deltaTime);
        this.draw();
        this.timerEnd();

        this.lastTime = this.currentTime;

        // call this.raf on every frame
        window.requestAnimationFrame(this.raf.bind(this));
    }

    update(dt) {
        let sl = this.sceneList,
            l = sl.length;

        if (l > 0) {
            //fastest possible loop
            while(l--) {
                if (this.currentScene === l) sl[l].update(dt);
            }
        }
    }

    draw() {
        // console.log(this);
        let sl = this.sceneList,
            l = sl.length,
            gl = this.gl;


        // set viewport
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

        // reset background to a grey color
        gl.clearColor(0.5, 0.5, 0.5, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        if (l > 0) {
            while (l--) {
                if (this.currentScene === l) sl[l].draw();
            }
        }


    }

    // TIMER FUNCTIONS
    timerBegin() {
        this.startTime = Date.now();
    }

    timerEnd() {
        let time = Date.now();

        this.framesFps++;

        if (time > this.prevTime + 1000) {
            this.fpsValue = Math.round((this.framesFps * 1000) / (time - this.prevTime));
            this.fpsMin = Math.min(this.fpsMin, this.fpsValue);
            this.fpsMax = Math.max(this.fpsMax, this.fpsValue);
            this.fpsContainer.innerHTML = this.fpsValue + ' FPS (' + this.fpsMin + '-' + this.fpsMax + ')';
            this.prevTime = time;
            this.framesFps = 0;
        }

        return time;
    }

    // SCENE FUNCTIONS
    addScene(scene) {
        console.log("Add Scene - ", scene.options.sceneName);
        this.sceneList.push(scene);
        return scene;
    }
}
