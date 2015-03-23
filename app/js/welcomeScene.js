import Scene from "Orion/Scene";
import Grid from "Orion/Grid";

import Player from "player";
import Cube from "cube";

class welcomeScene extends Scene {
    init() {
        // this.map = this.addEntity(new Grid({name: "Map"}));
        // this.player = this.addEntity(new Player({name: "Player"}));
        this.Cube = this.addEntity(new Cube({name: "Cube"}));
    }
}

export default welcomeScene;
