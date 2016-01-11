import Scene from "Orion/Scene";
import Plane from "Orion/Plane";
import Camera from "Orion/Camera";
import WebGLObject from 'Orion/WebGLObject';

import Player from "entities/player";
import StormTrooper from "entities/StormTrooper";


class Sky extends WebGLObject {}

class WelcomeScene extends Scene {

    init() {

        let sky = new Sky({
            scale: {
                x: 2000,
                y: 2000,
                z: 2000
            }
        });

        this.addEntity(sky);


        // let pl = [];
        // let gridPlane = 50;

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

        // new Plane({
        //     name: name,
        //     texture: "stormtrooper",
        //     x: 0,
        //     y: 0,
        //     scale: {
        //         x: 3.0,
        //         y: 1.0,
        //         z: 3.0
        //     }
        // });


        // let st = [];
        // let grid = 40;

        // for (let x = -grid; x < grid; x += 5) {
        //     for (let z = -grid; z < grid; z += 5) {

        //         let name = "frinlet" + z + x;

        //         st[x] = new StormTrooper({
        //             name: name,
        //             model: "stormtrooper",
        //             texture: "stormtrooper",
        //             scale: {
        //                 x: 2.0,
        //                 y: 2.0,
        //                 z: 2.0
        //             }
        //         });

        //         st[x].x = x;
        //         st[x].z = z;

        //         this.addEntity(st[x]);
        //     }
        // }

        // Add camera set distance and set focus entity
        let myCamera = this.addCamera(new Camera({
            distance: {
                x: 0.0,
                y: -4.0,
                z: -10.0
            },
            focus: sky
        }));

        this.setCurrentCamera(myCamera);
    }
}

export
default WelcomeScene;