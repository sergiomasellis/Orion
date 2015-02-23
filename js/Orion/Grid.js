(function(){
    'use strict';
    /**
     * Grid Class
     *
     * @class
     * @name O.Game.Grid
     * @extends O.Game
     *
     * @constructor
     * @param options config settings of the game class
     * @param dependencies instances of other classes
     *
     * @exports entity as O.Game.Grid
     */
    var Grid = O.Class.extend(O.Game, 'O.Game.Grid', function Grid(options, dependencies) {

        this.dependencies = dependencies;
        this.options = O.Utils.extend({}, this.options, options);

        this.canvas = O.Injector.dependencies.canvas;
        this.context =  O.Injector.dependencies.context;
        this.gl = this.context;

        this.buffered = this.options.buffer || false;
        this.rotate = this.options.rotate  || 0;

        this.gridSize = 32;

        this.sizeX = this.canvas.width/this.gridSize;
        this.sizeY = this.canvas.height/this.gridSize;

        this.data = null;
        var _this = this;

        var request = new XMLHttpRequest();
        request.open('GET', 'tiles/map1.json', true);


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

        this.tiles = [];

        //this.img1 = new Image();
        //this.img2 = new Image();
        //this.img3 = new Image();


    });

    Grid.prototype.init = function() {
        //this.img1.src = 'img/stonebrick.png';
        //this.img2.src = 'img/leaves_jungle_opaque.png';
        //this.img3.src = 'img/stonebrick_mossy.png';

        this.map = this.data.layers[0].data;

        console.log(this.data.tilesets[0]);

        //for (var i = 0; i < this.data.tilesets[0].tiles.length; i++) {
        //    var image = new Image();
        //        image.src = this.data.tilesets[0].tiles[i].image;
        //    this.tiles.push(image);
        //    debugger;
        //}

        for(var index in this.data.tilesets[0].tiles) {
            if (this.data.tilesets[0].tiles.hasOwnProperty(index)) {
                var image = new Image();
                    image.src = "Orion/"+this.data.tilesets[0].tiles[index].image;
                this.tiles.push(image);
            }
        }
    }

    Grid.prototype.update = function() {}

    Grid.prototype.draw = function() {
        //for (var x = 0; x < this.canvas.width; x += 100) {
        //    var roundedX = (0.5 + x) << 0;
        //    this.context.moveTo(roundedX, 0);
        //    this.context.lineTo(roundedX, this.canvas.height);
        //}
        //
        //for (var y = 0; y < this.canvas.height; y += 100) {
        //    var roundedY = (0.5 + y) << 0;
        //    this.context.moveTo(0, roundedY);
        //    this.context.lineTo(this.canvas.width, roundedY);
        //}
        //
        ////this.context.strokeStyle = "#ddd";
        //this.context.stroke();



        //var w = Math.round((this.canvas.width/this.gridSize)+1);
        //var h =  Math.round((this.canvas.height/this.gridSize)+1);

        var w = 100,
            h = 100;

        var totalTiles = w * h;
        var currentTile = 0;
        //console.log(w);

        if(!this.map) return;
        if(this.tiles.length === 0) return;

        for (var i = 0; i < w; i++) {
            for (var j = 0; j < h; j++) {
                var img = null;
                //debugger;

                //if(this.map[currentTile] === 0) img = this.img1;
                //if(this.map[currentTile] === 1) img = this.img1;
                //if(this.map[currentTile] === 2) img = this.img2;
                //if(this.map[currentTile] === 3) img = this.img3;
                //else img = this.img1;

                this.context.drawImage(this.tiles[this.map[currentTile]-1], j*this.gridSize, i*this.gridSize);
                currentTile++;
            }
        }

        //var w = 32,
        //    h = 32;

        //this.context.beginPath();
        //for (var x=0;x<=w;x+=32){
        //    //this.context.moveTo(x-0.5,0);      // 0.5 offset so that 1px lines are crisp
        //    //this.context.lineTo(x-0.5,h);
        //
        //    this.context.drawImage(this.img,  (0.5 + x) | 0,  (0.5 + h) | 0);
        //}
        //for (var y=0;y<=h;y+=50){
        //    //this.context.moveTo(0,y-0.5);
        //    //this.context.lineTo(w,y-0.5);
        //    this.context.drawImage(this.img,  (0.5 + w) | 0,  (0.5 + y) | 0);
        //}
        ////this.context.strokeStyle = "#ddd";
        //this.context.stroke();               // Only do this once, not inside the loops
    }

})();