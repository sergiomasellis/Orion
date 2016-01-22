import Utils from './Utils';

class Injector {
    constructor() {
        this.dependencies = {};

        window.injector = this;
    }

    register(name, instance) {
        let dep = {};
            dep[name] = instance;

        Utils.extend(this.dependencies, dep);
    }

    get(prop){
        return this.dependencies[prop];
    }
}

export default new Injector;
