import Utils from 'Orion/Utils';
import Injector from "Orion/Injector";

class Entity {

    constructor(options = {}) {
        
        this.options = Utils.extend(this.options, options);

        this.uuid = this.options.uuid || Utils.generateUUID();
        this.buffered = this.options.buffer || false;
        this.rotation = this.options.rotation || {x:0, y:0, z:0};

        this.x = this.options.x || 0.0;
        this.y = this.options.y || 0.0;
        this.z = this.options.z || 0.0;

        // Before init check if game engine ready?
        if(Injector.get("game").isReady){ 
            this.init();
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
