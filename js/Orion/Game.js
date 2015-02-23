﻿(function() {
    'use strict';
    /**
     * Game Class
     *
     * @class
     * @name O.Game
     * @extends O.Class
     *
     * @constructor
     * @param options config settings of the game class
     * @param dependencies instances of other classes
     *
     * @exports Game as O.Game
     */
    var Game = O.Class.create('O.Game', function Game(options, dependencies) {

        this.dependencies = dependencies;
        this.options = O.Utils.extend({}, this.options, options);
        this.config = O.Config;

        this.init();
    });

    Game.prototype.init = function () {

        //Select Canvas
        this.canvas = document.getElementById("mainCanvas");
        this.canvas.focus();

        //Pre render Canvas
        this.preRenderCanvas = document.getElementById("preRenderCanvas");
        this.preRenderCanvas.width = window.innerWidth;
        this.preRenderCanvas.height = window.innerHeight;
        this.preContext = (this.config.engine === "2d") ? this.preRenderCanvas.getContext('2d') : this.preRenderCanvas.getContext("experimental-webgl", {antialias: true}) || this.preRenderCanvas.getContext("webgl");


        this.context = (this.config.engine === "2d") ? this.canvas.getContext('2d') : this.canvas.getContext("experimental-webgl", {antialias: true}) || this.canvas.getContext("webgl");
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;



        O.Logger.log(this.config.engine+" Engine Loaded");

        //add instances to the injector
        O.Injector.register('canvas', this.canvas);
        O.Injector.register('preRenderCanvas', this.preRenderCanvas);
        O.Injector.register('context', this.context);
        
        //Select FPS div
        this.fpsContainer = document.getElementById("fps");

        //Initialize timer
        this.startTime = Date.now();
        this.prevTime = this.startTime;

        this.ms = 0;
        this.msMin = Infinity;
        this.msMax = 0;

        this.fpsValue = 0;
        this.fpsMin = Infinity; 
        this.fpsMax = 0;

        this.framesFps = 0;

        //List of Scenes
        this.sceneList = [];
        this.currentScene = 0;

        //Initialize game loop
        this.raf();

        O.Logger.log("Engine initialized v"+this.config.version);
    }

    Game.prototype.changeScene = function(sceneID){
    	this.currentScene = sceneID;
    	O.Logger.log("Current Scene is: "+sceneID);
    }

    /**
     * Adds Scene to current game instance
     * @param scene
     * @returns {scene}
     */
    Game.prototype.addScene = function(scene) {
        O.Logger.log("Add Scene - "+ scene.options.sceneName);
        this.sceneList.push(scene);
        return scene;
    }

    Game.prototype.raf = function () {

        //loop over update and draw functions
        this.timerBegin();
            this.update();
            this.draw();
        this.timerEnd();
        
        // call this.raf on every frame
        window.requestAnimationFrame(this.raf.bind(this));
    }

    Game.prototype.fps = function () {
        return this.fpsValue;
    }

    Game.prototype.timerBegin = function () {
        this.startTime = Date.now();
    }

    Game.prototype.timerEnd = function () {
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

    Game.prototype.update = function () {
        var _this = this;

        if( this.sceneList.length > 0){
            this.sceneList.forEach(function(item, i){
            	if(_this.currentScene === i){
            		item.update();
            	}
            });
        }
    }

    Game.prototype.draw = function () {
        var _this = this;
        this.preContext.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
        if( this.sceneList.length > 0){
            this.sceneList.forEach(function(item, i){

            	if(_this.currentScene === i){
                	item.draw();
                }
            });
        }
    }
    
})();