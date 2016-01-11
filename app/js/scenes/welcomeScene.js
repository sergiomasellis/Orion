import Scene from "Orion/Scene";
import Plane from "Orion/Plane";
import Camera from "Orion/Camera";

import Player from "player";
import StormTrooper from "StormTrooper";

class WelcomeScene extends Scene {

    init() {

        let playerObj = new Player({
            name: "Stevoid1990",
            model: "frinlet",
            texture: "frinlet"
        });

        this.addEntity(playerObj);


        let pl = [];
        let gridPlane = 50;

        // for (let x = -gridPlane; x < gridPlane; x += 5) {
        //     for (let z = -gridPlane; z < gridPlane; z += 5) {

        //         let name = "myPlane" + z + x;

        //         pl[x] = new Plane({
        //             name: name,
        //             texture: "stormtrooper",
        //             scale: {
        //                 x: 3.0,
        //                 y: 1.0,
        //                 z: 3.0
        //             }
        //         });

        //         pl[x].x = x;
        //         pl[x].z = z;

        //         this.addEntity(pl[x]);
        //     }
        // }

        new Plane({
            name: name,
            texture: "stormtrooper",
            x: 0,
            y: 0,
            scale: {
                x: 3.0,
                y: 1.0,
                z: 3.0
            }
        });


        let st = [];
        let grid = 50;

        for (let x = -grid; x < grid; x += 5) {
            for (let z = -grid; z < grid; z += 5) {

                let name = "frinlet" + z + x;

                st[x] = new StormTrooper({
                    name: name,
                    model: "stormtrooper",
                    texture: "stormtrooper",
                    scale: {
                        x: 2.0,
                        y: 2.0,
                        z: 2.0
                    }
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
            focus: playerObj
        }));

        this.setCurrentCamera(myCamera);
    }
}

export
default WelcomeScene;