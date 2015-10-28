import Config from 'Orion/Config';
import Utils from 'Orion/Utils';
import Injector from 'Orion/Injector';
import Camera from 'Orion/Camera';
import Controller from 'Orion/Controller';

export default
class Game {
    constructor(options, dependencies) {
        let _this = this;

        _this.dependencies = dependencies;
        _this.options = Utils.extend(_this.options, options);
        _this.config = Config;

        _this.init();
    }

    init() {
        let _this = this;

        //select canvas
        _this.canvas = document.getElementById("mainCanvas");
        _this.canvas.focus();

        //get 2d context
        _this.context = (_this.config.engine === "2d") ? _this.canvas.getContext('2d') : _this.canvas.getContext("webgl", {antialias: true}) || _this.canvas.getContext("experimental-webgl");
        _this.setScale = true;
        _this.gl = _this.context; //set webgl context

        //set canvas width
        _this.width = _this.canvas.width = window.innerWidth;
        _this.height = _this.canvas.height = window.innerHeight;

        //set webgl viewport
        _this.gl.viewportWidth = _this.width;
        _this.gl.viewportHeight = _this.height;

        //clear color init
        // _this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // _this.gl.enable(_this.gl.DEPTH_TEST);


        console.log("Orion Engine: ", _this.config.engine);
        console.log("checking for gl", _this.gl);
        //add instances to the injector
        Injector.register('canvas', _this.canvas);
        Injector.register('context', _this.context);
        Injector.register('gl', _this.gl);


        //Select FPS div
        _this.fpsContainer = document.getElementById("fps");

        //Timer for animation delta
        _this.lastTime = 0;
        _this.currentTime = 0;
        _this.deltaTime = 0;

        //Initialize timer for FPS Calc
        _this.startTime = Date.now();
        _this.prevTime = _this.startTime;

        //set default fps values
        _this.fpsValue = 0;
        _this.fpsMin = Infinity;
        _this.fpsMax = 0;
        _this.framesFps = 0;

        //List of Scenes
        _this.sceneList = [];
        _this.currentScene = 0;

        // //Scale
        // this.scale = 1;
        // Injector.register('scale', this.scale);

        //Create World Camera
        // _this.camera = new Camera();
        // _this.camera.zoomTo(300);
        // Injector.register('camera', _this.camera);


        //setup keyboard controls
        _this.controller = new Controller;
        Injector.register('controller', _this.controller);

        //Initialize game loop
        _this.raf();
    }

    // GAME LOOP FUNCTIONS
    raf() {
        let _this = this;
        _this.currentTime = Date.now();
        _this.deltaTime = (_this.currentTime - _this.lastTime) / 1000.0;

        //loop over update and draw functions
        _this.timerBegin();
        _this.update(_this.deltaTime);
        _this.draw();
        _this.timerEnd();

        _this.lastTime = _this.currentTime;

        // call this.raf on every frame
        window.requestAnimationFrame(_this.raf.bind(_this));
    }

    update(dt) {
        var _this = this,
            sl = _this.sceneList,
            l = sl.length;

        if (l > 0) {
            //fastest possible loop
            while(l--) {
                if (_this.currentScene === l) sl[l].update(dt);
            }
        }
    }

    draw() {
        let _this = this,
            sl = _this.sceneList,
            l = sl.length;

        //_this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
        // _this.context.clear(_this.context.COLOR_BUFFER_BIT | _this.context.DEPTH_BUFFER_BIT);
        // _this.camera.begin();

        if (l > 0) {
            while (l--) {
                if (_this.currentScene === l) sl[l].draw();
            }
        }

        // _this.camera.end();
    }

    // TIMER FUNCTIONS
    timerBegin() {
        this.startTime = Date.now();
    }

    timerEnd() {
        let _this = this,
            time = Date.now();

        _this.framesFps++;

        if (time > _this.prevTime + 1000) {
            _this.fpsValue = Math.round((_this.framesFps * 1000) / (time - _this.prevTime));
            _this.fpsMin = Math.min(_this.fpsMin, _this.fpsValue);
            _this.fpsMax = Math.max(_this.fpsMax, _this.fpsValue);
            _this.fpsContainer.innerHTML = _this.fpsValue + ' FPS (' + _this.fpsMin + '-' + _this.fpsMax + ')';
            _this.prevTime = time;
            _this.framesFps = 0;
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
