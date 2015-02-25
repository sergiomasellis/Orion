﻿import Config from 'Orion/Config';
import Utils from 'Orion/Utils';

export default class Game {
    constructor(options, dependencies){

        this.dependencies = dependencies;
        this.options = Utils.extend(this.options, options);
        this.config = Config;

        this.init();
    }

    init(){

        //select canvas
        this.canvas = document.getElementById("mainCanvas");
        this.canvas.focus();

        //get 2d context
        this.context = (this.config.engine === "2d") ? this.canvas.getContext('2d') : this.canvas.getContext("experimental-webgl", {antialias: true}) || this.canvas.getContext("webgl");

        //set canvas width
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;

        //Select FPS div
        this.fpsContainer = document.getElementById("fps");

        //Initialize timer
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

        //Initialize game loop
        this.raf();
    }

    // GAME LOOP FUNCTIONS
    raf(){
        //loop over update and draw functions
        this.timerBegin();
            this.update();
            this.draw();
        this.timerEnd();

        // call this.raf on every frame
        window.requestAnimationFrame(this.raf.bind(this));
    }

    update(){
        var _this = this;
        if( this.sceneList.length > 0){
            this.sceneList.forEach(function(item, i){
            	if(_this.currentScene === i)item.update();
            });
        }
    }

    draw(){
        var _this = this;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if( this.sceneList.length > 0){
            this.sceneList.forEach(function(item, i){
            	if(_this.currentScene === i) item.draw();
            });
        }
    }

    // TIMER FUNCTIONS
    timerBegin(){
        this.startTime = Date.now();
    }

    timerEnd(){
        var time = Date.now();
        this.framesFps++;

        if ( time > this.prevTime + 1000) {
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
    addScene(scene){
        console.log("Add Scene - ", scene.options.sceneName);
        this.sceneList.push(scene);
        return scene;
    }
}