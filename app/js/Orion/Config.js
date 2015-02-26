import Utils from 'Orion/Utils';

class Config {
    constructor() {
        this.version = "0.0.1";
        this.engine = "2d";
    }

    setConfig(obj) {
        Utils.extend(this, obj);
    }
}

//initalized automatically
export default new Config;