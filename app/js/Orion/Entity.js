import Game from "Orion/Game";
import Utils from 'Orion/Utils';

class Entity{

    constructor(options, dependencies){

		this.dependencies = dependencies;
        this.options = Utils.extend(this.options, options);

        //this.canvas = O.Injector.dependencies.canvas;
        //this.preRenderCanvas = O.Injector.dependencies.preRenderCanvas;
        //this.context =  O.Injector.dependencies.context;
        //this.gl = this.context;

		this.buffered = this.options.buffer || false;
		this.rotate = this.options.rotate  || 0;
		this.uuid = this.options.uuid || Utils.generateUUID();
		this.x = this.options.x || 0;
		this.y = this.options.y || 0;
		this.z = this.options.z || 0;

		this.init();
    }

    init(){
        console.log(this);
    }
    update(){}
    draw(){}

}

export default Entity;