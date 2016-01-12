import Scene from "Orion/Scene";
import Plane from "Orion/Plane";
import Camera from "Orion/Camera";
import WebGLObject from 'Orion/WebGLObject';

import Player from "entities/player";
import StormTrooper from "entities/StormTrooper";


class Sky extends WebGLObject {}

class WelcomeScene extends Scene {

    init() {

        let sky = new Plane({
            scale: {
                x: 2000,
                y: 2000,
                z: 2000
            }
        });
        sky.rotation.x =  -90 * Math.PI / 180;

        this.addEntity(sky);


        // let cube = new Sky({
        //     scale: {
        //         x: 0.8,
        //         y: 0.8,
        //         z: 0.8
        //     }
        // });

        // this.addEntity(cube);



        let playerObj = new Player({
            name: "Stevoid1990",
            model: "frinlet",
            texture: "frinlet"
        });

        this.addEntity(playerObj);


        let st = [];
        let grid = 40;

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