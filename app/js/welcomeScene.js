import Scene from "Orion/Scene";
import Grid from "Orion/Grid";
import Camera from "Orion/Camera";

import Player from "player";
import WebGLObject from "WebGLObject";
import owl from "owl";

class welcomeScene extends Scene {
    init() {

        var frinlet2 = new WebGLObject({name: "Stevoid1990", model: "frinlet", texture: "frinlet", playable: true});
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

        //add camera
        this.currentCamera = this.addCamera(new Camera({distance: {x: 0.0, y:-4.0, z:-7.0}}));

        this.currentCamera.lookAt = player[20];
        console.log(this.currentCamera);
    }
}

export default welcomeScene;
