import Utils from 'Orion/Utils';
import Injector from 'Orion/Injector';
import Controller from 'Orion/Controller';

export default class Grid {
    constructor(options, dependencies){
        this.dependencies = dependencies;
        this.options = Utils.extend(this.options, options);

        this.canvas = Injector.dependencies.canvas;
        this.context =  Injector.dependencies.context;

        this.controller = new Controller;

        this.buffered = this.options.buffer || false;
        this.rotate = this.options.rotate  || 0;

        this.gridSize = 16;

        this.x = 0;
        this.y = 0;
        this.speed = 16;

        this.tiles = [];

        this.data = null;
        var _this = this;

        var request = new XMLHttpRequest();
        request.open('GET', '../tiles/map2.json', true);


        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                _this.data = JSON.parse(request.responseText);
                _this.init();
            } else {
                // We reached our target server, but it returned an error

            }
        };

        request.onerror = function() {
            // There was a connection error of some sort
        };

        request.send();
    }
    init(){
        this.map = this.data.layers[0].data;


        for(var index in this.data.tilesets[0].tiles) {
            if (this.data.tilesets[0].tiles.hasOwnProperty(index)) {
                var image = new Image();
                    image.src = "Orion/"+this.data.tilesets[0].tiles[index].image;
                this.tiles.push(image);
            }
        }
    }
    update(){

        if (this.controller.direction.W) {
            this.y += this.speed;

            this.controller.direction.W = false;
        }

        if (this.controller.direction.S) {
            this.y -= this.speed;
            this.controller.direction.S = false;
        }

        if (this.controller.direction.A) {
            this.x += this.speed;
            this.controller.direction.A = false;
        }

        if (this.controller.direction.D) {
            this.x -= this.speed;
            this.controller.direction.D = false;
        }
    }
    draw(){

        var w = 100,
            h = 100,
            currentTile = 0;


        if(!this.map) return;
        if(this.tiles.length === 0) return;

        //this.context.translate(this.x, this.y);

        for (var i = 0; i < w; i++) {
            for (var j = 0; j < h; j++) {
                this.context.drawImage(this.tiles[this.map[currentTile]-1], (j*this.gridSize)+this.x, (i*this.gridSize)+this.y);
                currentTile++;
            }
        }
    }
}