import Utils from 'Orion/Utils';
import Injector from "Orion/Injector";
import Game from "Orion/Game";

class Entity {

    constructor(options, dependencies) {

        this.dependencies = dependencies;
        this.options = Utils.extend(this.options, options);
        // this is an example

        this.canvas = Injector.dependencies.canvas;
        //this.preRenderCanvas = O.Injector.dependencies.preRenderCanvas;
        this.context = Injector.dependencies.context;
        //this.gl = this.context;

        this.buffered = this.options.buffer || false;
        this.rotation = this.options.rotation || {x:0, y:0, z:0};
        this.uuid = this.options.uuid || Utils.generateUUID();
        this.x = this.options.x || 0.0;
        this.y = this.options.y || 0.0;
        this.z = this.options.z || 0.0;
        // this.scale = this.options.scale || 1.0;



        // Before init check if game engine ready?
        if(Injector.dependencies.game.isReady){ 
            this.init();
        }else{
            Injector.dependencies.game.onReady(()=>{
                this.init();
            }.bind(this));
        }
    }

    init() {
        
    }

    update() {
    }

    draw() {
    }

}

export default Entity;
