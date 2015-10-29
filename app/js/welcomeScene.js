import Scene from "Orion/Scene";
import Grid from "Orion/Grid";

import Player from "player";
import frinlet from "frinlet";
import owl from "owl";

class welcomeScene extends Scene {
    init() {




     	let player = [];
        let grid = 50;

        for (let x = -grid; x < grid; x += 5) {
            for (let z = -grid; z < grid; z += 5) {

            	let name = "frinlet"+z+x;

            		player[x] = new frinlet({name: name});
                    player[x].update = () => {};
            		player[x].x = x;
                    player[x].z = z;

            	this.addEntity(player[x]);

            }
        }

        let frinlet2 = new frinlet({name: "Stevoid1990"});
        frinlet2.playable = true;
        this.addEntity(frinlet2);


    }
}

export default welcomeScene;
