import Utils from 'Orion/Utils';
import Injector from 'Orion/Injector';

class Scene {
    constructor(options = {}) {
       
        this.options = Utils.extend(this.options, options);
        this.uuid = this.options.uuid || Utils.generateUUID();

        this.entityList = [];
        this.cameraList = [];

        // Don't start till game is ready
        if(Injector.get("game").isReady){
            this.init();
        }else{
            Injector.get("game").onReady(()=>{
                this.init();
            }.bind(this));
        }
        // this.init();
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
        let i = 0,
            _this = this,
            el = _this.entityList,
            l = el.length,
            cl = _this.cameraList,
            cll = _this.cameraList.length;

        if (l) {
            while (i < l) {
                el[i].update(dt);
                i++;
            };
        }
        
        if(cll) { 
            cl[_this.currentCamera].update(dt); 
        }else{
            throw Error("Please add a camera to the scene");
        }
    }

    draw() {
        let i = 0,
            _this = this,
            el = _this.entityList,
            l = el.length;

        if (l) {
            while (i < l) {
                el[i].draw();
                i++;
            };
        }
    }
}

export default Scene;
