import Scene from "Orion/Scene";
import Grid from "Orion/Grid";
import Camera from "Orion/Camera";

import Player from "Player";
import StormTrooper from "StormTrooper";

class WelcomeScene extends Scene {

    init() {

        var frinlet2 = new Player({
            name: "Stevoid1990",
            model: "frinlet",
            texture: "frinlet",
            playable: true
        });

        this.addEntity(frinlet2);

        let st = [];
        let grid = 50;

        for (let x = -grid; x < grid; x += 5) {
            for (let z = -grid; z < grid; z += 5) {

                let name = "frinlet" + z + x;

                st[x] = new StormTrooper({
                    name: name,
                    model: "stormtrooper",
                    texture: "stormtrooper",
                    scale: 2
                });

                st[x].x = x;
                st[x].z = z;

                this.addEntity(st[x]);
            }
        }

        //add camera
        this.currentCamera = this.addCamera(new Camera({
            distance: {
                x: 0.0,
                y: -4.0,
                z: -7.0
            }
        }));

        this.currentCamera.lookAt(frinlet2);

    }
}

export default WelcomeScene;