import Scene from "../Orion/Scene";
import Models from '../Orion/Model';
import Shaders from '../Orion/Shader';
import Plane from "../Orion/Plane";
import Camera from "../Orion/Camera";
import Injector from '../Orion/Injector';

import WebGLObject from '../Orion/WebGLObject';

import Player from "../entities/player";
import StormTrooper from "../entities/StormTrooper";



class WelcomeScene extends Scene {

    init() {

        let playerObj = new Player({
            name: "Sergio",
            model: "frinlet",
            texture: "frinlet"
        });

        this.addEntity(playerObj);

        let st = [];
        let grid = 40;

        for (let x = -grid; x < grid; x += 5) {
            for (let z = -grid; z < grid; z += 5) {

                let name = "planes" + z + x;

                st[x] = new Plane({
                    name: name,
                    model: "cube",
                    texture: "base",
                    scale: {
                        x: 1.0,
                        y: 1.0,
                        z: 1.0
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

export default WelcomeScene;