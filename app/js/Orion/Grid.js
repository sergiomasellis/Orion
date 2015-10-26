import Utils from 'Orion/Utils';
import Injector from 'Orion/Injector';

export default class Grid {
    constructor(options, dependencies) {
        this.dependencies = dependencies;
        this.options = Utils.extend(this.options, options);

        this.canvas = Injector.dependencies.canvas;
        this.context = Injector.dependencies.context;
        this.camera = Injector.dependencies.camera;
        // this.controller = Injector.dependencies.controller;

        this.buffered = this.options.buffer || false;
        this.rotate = this.options.rotate || 0;

        this.scale = 1;
        //size of image square
        this.gridSize = 16;
        // this.gridSize = this.canvas.width/10;
        // this.trueSizeOfGridSquare = this.canvas.width/this.gridSize;
        // this.gridSize = this.trueSizeOfGridSquare;
        // console.log(this.canvas.width, this.gridSize);

        var coords = this.camera.screenToWorld(0, 0);

        this.x = coords.x;
        this.y = coords.y;

        this.camerax = 0;
        this.cameray = 0;

        this.speed = 50;

        this.tiles = [];

        this.data = null;
        var _this = this;

        var request = new XMLHttpRequest();
        request.open('GET', '../tiles/map3.json', true);


        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                _this.data = JSON.parse(request.responseText);
                _this.init();
            } else {
                // We reached our target server, but it returned an error

            }
        };

        request.onerror = () => {
            // There was a connection error of some sort
        };

        request.send();
    }

    init() {

        let self = this;
        this.map = this.data.layers[0].data;

        let tiles = null;

        for (let index in this.data.tilesets[0].tiles) {

            if (tiles === null) {
                tiles = this.data.tilesets[0].tiles;
            }

            let image = new Image();
            image.src = tiles[index].image;
            this.tiles.push(image);

        }
    }

    update() {

    }

    draw() {

        let w = 50,
            h = 50,
            currentTile = 0;

        if (!this.map || this.tiles.length === 0) return;


        for (var i = 0; i < w; i++) {
            for (var j = 0; j < h; j++) {
                // this.context.drawImage(this.tiles[this.map[currentTile] - 1], (j * (this.gridSize) * this.scale) + this.x, (i * (this.gridSize) * this.scale) + this.y, this.gridSize * this.scale, this.gridSize*this.scale);
                currentTile++;
            }
        }
    }
}
