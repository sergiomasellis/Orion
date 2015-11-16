import Scene from "Orion/Scene";
import Grid from "Orion/Grid";
import Camera from "Orion/Camera";

import Player from "Player";
import StormTrooper from "StormTrooper";

class WelcomeScene extends Scene {

    init() {

        var frinlet2 = new Player({
            name: "Stevoid1990",
            model: "stormtrooper",
            texture: "stormtrooper"
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
                    texture: "stormtrooper"
                });

                st[x].x = x;
                st[x].z = z;

                this.addEntity(st[x]);
            }
        }

        // Add camera set distance and set focus entity
        let myCamera = this.addCamera(new Camera({
            distance: {
                x: 0.0,
                y: -2.0,
                z: -3.0
            },
            focus: frinlet2
        }));

        this.setCurrentCamera(myCamera);

        // used to test multiple cameras working
        // window.myCamera = myCamera;

        // window.myCamera2 = this.addCamera(new Camera({
        //     distance: {
        //         x: 0.0,
        //         y: -6.0,
        //         z: -3.0
        //     }
        // }));

        // window.scene = this;
    }
}

export default WelcomeScene;