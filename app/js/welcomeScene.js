import Scene from "Orion/Scene";
import Grid from "Orion/Grid";

import Player from "player";

class welcomeScene extends Scene {
    init() {
        this.map = this.addEntity(new Grid({name: "Map"}));
        this.player = this.addEntity(new Player({name: "Player"}));

    }
}

export default welcomeScene;
