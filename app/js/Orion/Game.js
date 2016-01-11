import Config from 'Orion/Config';
import Utils from 'Orion/Utils';

import Injector from 'Orion/Injector';
import Context from 'Orion/Context';
import Controller from 'Orion/Controller';

import Resource from 'Orion/Resource';
import Shaders from 'Orion/Shader';
import Models from 'Orion/Model';
import Texture from 'Orion/Texture';

export default class Game {
    constructor(options = {}) {

        // this.options = Utils.extend(this.options, options);

        // Get Context
        this.gl = new Context();

        this.isReady = false;
        this.readyCallbacks = [];
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
        if(Config.get("controller")) {
            this.controller = new Controller;
            Injector.register('controller', this.controller);
        }

        // Setup gameOnReady Callback
        Injector.register('game', this);

        // Get Resources
        Promise.all([
            Resource.load(Config.get("images")),
            Texture.load(Config.get("textures")),
            Shaders.load(Config.get("shaders")),
            Models.load(Config.get("models"))
        ]).then(() => {
            console.log("Game: All resources loaded and compiled");
            this.startGameEngine();
        }).catch(err => {
            console.error(err);
        });
    }


    onReady(func) {
        this.readyCallbacks.push(func);
    }

    startGameEngine() {
        console.log("Game: Engine Starting ");
        this.isReady = true;

        // let scenes know to init now
        this.readyCallbacks.forEach((func) => {
            func();
        }.bind(this));
        this.raf();
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
        let i = 0,
            sl = this.sceneList,
            l = sl.length;

        if (l > 0) {
            // Fastest possible loop
            while (i < l) {
                if (this.currentScene === i) sl[i].update(dt);
                i++;
            };
        }
    }

    draw() {
        // console.log(this);
        let i = 0,
            sl = this.sceneList,
            l = sl.length,
            gl = this.gl;


        // set viewport
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);



        // window.polyCount = 0;

        // reset background to a grey color
        gl.clearColor(0.5, 0.5, 0.5, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        if (l > 0) {
            while (i < l) {
                if (this.currentScene === i) sl[i].draw();
                i++;
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
        this.onReady(() => {
            console.log("Game: Add Scene - ", scene.options.sceneName);
            this.sceneList.push(scene);
        });
        return scene;
    }
}