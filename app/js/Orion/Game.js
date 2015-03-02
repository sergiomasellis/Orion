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
    }

    init() {

        //select canvas
        this.canvas = document.getElementById("mainCanvas");
        this.canvas.focus();

        //get 2d context
        this.context = (this.config.engine === "2d") ? this.canvas.getContext('2d') : this.canvas.getContext("experimental-webgl", {antialias: true}) || this.canvas.getContext("webgl");
        this.setScale = true;

        //set canvas width
        this.width = this.canvas.width = 500;
        this.height = this.canvas.height = 300;

        console.log("Orion Engine: ", this.config.engine);

        //add instances to the injector
        Injector.register('canvas', this.canvas);
        Injector.register('context', this.context);


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
        this.camera = new Camera();
        this.camera.zoomTo(300);
        Injector.register('camera', this.camera);
        

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
        var _this = this;
        if (this.sceneList.length > 0) {
            this.sceneList.forEach(function (item, i) {
                if (_this.currentScene === i)item.update(dt);
            });
        }
    }

    draw() {
        var _this = this;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.camera.begin();

          if (this.sceneList.length > 0) {
              this.sceneList.forEach(function (item, i) {
                  if (_this.currentScene === i) item.draw();
              });
          }

        this.camera.end();
    }

    // TIMER FUNCTIONS
    timerBegin() {
        this.startTime = Date.now();
    }

    timerEnd() {
        var time = Date.now();
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
