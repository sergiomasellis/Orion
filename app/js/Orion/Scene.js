import Utils from 'Orion/Utils';
import Injector from 'Orion/Injector';

class Scene {
    constructor(options = {}, dependencies = {}) {
        this.dependencies = dependencies;
        this.options = Utils.extend(this.options, options);

        // this.buffered = this.options.buffer || false;
        this.uuid = this.options.uuid || Utils.generateUUID();

        this.entityList = [];
        this.cameraList = [];

        // // Don't start till game is ready
        if(Injector.dependencies.game.isReady){ 
            this.init();
        }else{
            Injector.dependencies.game.onReady(()=>{
                this.init();
            }.bind(this));
        }
    }

    init() {}

    addEntity(entity) {
        // console.log("Scene: Add Entity - " + entity.options.name);
        this.entityList.unshift(entity);
        return entity;
    }

    addCamera(camera) {
        this.cameraList[camera.uuid] = camera;
        this.cameraList.length++;
        return camera;
    }

    setCurrentCamera(camera){
        this.currentCamera = camera.uuid;
    }

    update(dt) {
        let _this = this,
            el = _this.entityList,
            l = el.length,
            cl = _this.cameraList,
            cll = _this.cameraList.length;

        if (l > 0) {
            while (l--) {
                el[l].update(dt);
            }
        }

        
        if(cll > 0) { 
            cl[_this.currentCamera].update(dt); 
        }else{
            throw Error("Please add a camera to the scene");
        }
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
