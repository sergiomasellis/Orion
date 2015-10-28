import Config from 'Orion/Config';
import Utils from 'Orion/Utils';
import Injector from 'Orion/Injector';
import Context from 'Orion/Context';
import Camera from 'Orion/Camera';
import Controller from 'Orion/Controller';

import Resources from 'Orion/Resource';
import Shaders from 'Orion/Shader';

export default class Game {
    constructor(options = {}, dependencies = {}) {
        this.dependencies = dependencies;
        this.options = Utils.extend(this.options, options);
        this.config = Config;

        // Get Context
        this.gl = Context.init();
        this.shaders = Shaders.init();

        this.init();
    }

    init() {

        // Select FPS div
        this.fpsContainer = document.getElementById("fps");

        // Timer for animation delta
        this.lastTime = 0;
        this.currentTime = 0;
        this.deltaTime = 0;

        // Initialize timer for FPS Calc
        this.startTime = Date.now();
        this.prevTime = this.startTime;

        // Set default fps values
        this.fpsValue = 0;
        this.fpsMin = Infinity;
        this.fpsMax = 0;
        this.framesFps = 0;

        // List of Scenes
        this.sceneList = [];
        this.currentScene = 0;


        // Setup keyboard controls
        this.controller = new Controller;
        Injector.register('controller', this.controller);

        // Get Resources
        Resources.load(this.config.images);
        Resources.onReady(()=>{

          // Get shaders from html script tag
          Shaders.load(this.config.shaders);

          // Initialize game loop
          Shaders.onReady(this.raf.bind(this));

        }.bind(this));
    }


    // GAME LOOP FUNCTIONS
    raf() {

        this.currentTime = Date.now();
        this.deltaTime = (this.currentTime - this.lastTime) / 1000.0;

        // Loop over update and draw functions
        this.timerBegin();
        this.update(this.deltaTime);
        this.draw();
        this.timerEnd();

        this.lastTime = this.currentTime;

        // Call this.raf on every frame
        window.requestAnimationFrame(this.raf.bind(this));
    }

    update(dt) {
        let sl = this.sceneList,
            l = sl.length;

        if (l > 0) {
            // Fastest possible loop
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
        console.log("Game: Add Scene - ", scene.options.sceneName);
        this.sceneList.push(scene);
        return scene;
    }
}
