import Scene from "Orion/Scene";
import Plane from "Orion/Plane";
import Camera from "Orion/Camera";

import Player from "player";
import StormTrooper from "StormTrooper";

class WelcomeScene extends Scene {

    init() {

        var frinlet2 = new Player({
            name: "Stevoid1990",
            model: "frinlet",
            texture: "frinlet"
        });

        this.addEntity(frinlet2);

        var plane = new Plane({
            name: "myPlane",
            texture: "stormtrooper"
        });
        
        this.addEntity(plane);
        
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
                y: -4.0,
                z: -10.0
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