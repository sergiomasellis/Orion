class Injector {
    constructor() {
        this.dependencies = {};
    }

    register(name, instance) {
        this.dependencies[name] = instance;
    }

    get(arr) {
        return arr.map((value) => {return self.dependencies[value];}.bind(this))
    }
}

export default new Injector;
