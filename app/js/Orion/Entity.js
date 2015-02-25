import Utils from 'Orion/Utils';
import Injector from "Orion/Injector";

class Entity{

    constructor(options, dependencies){

		    this.dependencies = dependencies;
        this.options = Utils.extend(this.options, options);

        this.canvas = Injector.dependencies.canvas;
        //this.preRenderCanvas = O.Injector.dependencies.preRenderCanvas;
        this.context = Injector.dependencies.context;
        //this.gl = this.context;

        this.buffered = this.options.buffer || false;
        this.rotate = this.options.rotate  || 0;
        this.uuid = this.options.uuid || Utils.generateUUID();
        this.x = this.options.x || 0;
        this.y = this.options.y || 0;
        this.z = this.options.z || 0;

		    this.init();
    }

    init(){}
    update(){}
    draw(){}

}

export default Entity;
