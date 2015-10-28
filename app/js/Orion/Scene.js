import Utils from 'Orion/Utils';

class Scene {
    constructor(options, dependencies) {
        this.dependencies = dependencies;
        this.options = Utils.extend(this.options, options);

        this.buffered = this.options.buffer || false;
        this.uuid = this.options.uuid || Utils.generateUUID();

        this.entityList = [];

        this.init();
    }

    init() {
    }

    addEntity(entity) {
        console.log("Scene: Add Entity - " + entity.options.name);
        this.entityList.unshift(entity);
        return entity;
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
    }

    draw() {
        let _this = this,
            el = _this.entityList,
            l = el.length;

        if (l > 0) {
            while (l--) {
                el[l].draw();
            }
        }
    }
}

export default Scene;
