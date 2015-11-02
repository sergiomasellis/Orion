import Utils from 'Orion/Utils';

class Scene {
    constructor(options, dependencies) {
        this.dependencies = dependencies;
        this.options = Utils.extend(this.options, options);

        this.buffered = this.options.buffer || false;
        this.uuid = this.options.uuid || Utils.generateUUID();

        this.entityList = [];
        this.cameraList = [];

        this.init();
    }

    init() {
    }

    addEntity(entity) {
        // console.log("Scene: Add Entity - " + entity.options.name);
        this.entityList.unshift(entity);
        return entity;
    }

    addCamera(camera) {
        // console.log("Scene: Add Entity - " + entity.options.name);
        this.cameraList.unshift(camera);
        // console.log(this.cameraList);
        return camera;
    }

    setCurrentCamera(camera){
        this.currentCamera = camera;
    }

    update(dt) {
        let _this = this,
            el = _this.entityList,
            l = el.length;

        if (l > 0) {
            while (l--) {
                el[l].update(dt);
            }
        }

        this.cameraList[0].update(dt);
    }

    draw() {
        let _this = this,
            el = _this.entityList,
            l = el.length,
            cL = this.cameraList.length

        if (l > 0) {
            while (l--) {
                el[l].draw();
            }
        }


        // if(cL > 0){
            // while(cL--){
                
            // }
        // }

    }
}

export default Scene;
