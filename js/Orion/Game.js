﻿(function() {

    var Game = O.Class.create('O.Game', function Game(options, dependencies) {

        this.dependencies = dependencies;
        this.options = O.Utils.extend({}, this.options, options);
        this.init();
    });

    Game.prototype.init = function () {

        //Select Canvas
        this.canvas = document.getElementById("canvas");

        this.context = (this.options.engine === "2d") ? this.canvas.getContext('2d') : this.canvas.getContext("experimental-webgl", {antialias: true}) || this.canvas.getContext("webgl");
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;

        //add instances to the injector
        O.Injector.register('canvas', this.canvas);
         O.Injector.register('context', this.context);

        //initialize webGL
        // this.gl = this.canvas.getContext("experimental-webgl", {antialias: true}) || this.canvas.getContext("webgl");
        
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

        //List of Entities
        this.entityList = [];

        //Initialize game loop
        this.raf();

        O.Logger.log("Engine initialized v"+O.Config.version);
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

    Game.prototype.addEntity = function(entity) {
        O.Logger.log("Add Entity - "+ entity.__proto__.fullClassName);
        this.entityList.push(entity);
        return entity;
    }

    Game.prototype.update = function () {
        // this.entitylist.update();
        if( this.entityList.length > 0){
            this.entityList.forEach(function(item, i){
                item.update();
            });
        }
    }

    Game.prototype.draw = function () {

        if( this.entityList.length > 0){
            this.entityList.forEach(function(item, i){
                item.draw();
            });
        }
    }

    
})();