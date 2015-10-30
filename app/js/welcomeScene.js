import Scene from "Orion/Scene";
import Grid from "Orion/Grid";

import Player from "player";
import WebGLObject from "WebGLObject";
import owl from "owl";

class welcomeScene extends Scene {
    init() {

        let frinlet2 = new WebGLObject({name: "Stevoid1990", model: "frinlet", texture: "frinlet", playable: true});
        this.addEntity(frinlet2);

     	let player = [];
        let grid = 50;

        for (let x = -grid; x < grid; x += 5) {
            for (let z = -grid; z < grid; z += 5) {

            	let name = "frinlet"+z+x;

            		player[x] = new owl({name: name, model: "stormtrooper", texture: "stormtrooper", scale: 2});
                    player[x].update = () => {};
            		player[x].x = x;
                    player[x].z = z;
                    

            	this.addEntity(player[x]);
            }
        }

        // let frinlet3 = new WebGLObject({name: "Stevoid1990", model: "frinlet", texture: "frinlet"});
        // this.addEntity(frinlet3);

    }
}

export default welcomeScene;
