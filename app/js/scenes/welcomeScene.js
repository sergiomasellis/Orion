import Scene from "Orion/Scene";
import Models from 'Orion/Model';
import Shaders from 'Orion/Shader';
import Plane from "Orion/Plane";
import Camera from "Orion/Camera";
import Injector from 'Orion/Injector';

import WebGLObject from 'Orion/WebGLObject';

import Player from "entities/player";
import StormTrooper from "entities/StormTrooper";


import Program from "Orion/Program";


class SkyProgram extends Program {
    uniforms() {
        //get color uniform
        this.shaderProgram.uSunPosUniform = Injector.get("gl").getUniformLocation(this.shaderProgram, "uSunPos");
    }
    attributes() {
        this.shaderProgram.position = Injector.get("gl").getAttribLocation(this.shaderProgram, 'position');
        Injector.get("gl").enableVertexAttribArray(this.shaderProgram.position);
    }
}


class Sky extends Plane {

    draw() {
        this.theta += 0.0125;
        Injector.dependencies.gl.uniform3fv(Injector.get(this.programName).uSunPosUniform, [0, Math.cos(this.theta) * 0.3 + 0.2, -1]);

        Injector.dependencies.gl.vertexAttribPointer(Injector.get(this.programName).position, 3, Injector.dependencies.gl.FLOAT, false, 0, 0);

        // draw to canvas
        Injector.dependencies.gl.drawArrays(Injector.dependencies.gl.TRIANGLES, 0, Models.bufferedModels[this.model].numItems);
    }
}



class WelcomeScene extends Scene {

    init() {

        Promise.all([
            Shaders.load([
            ]) // compile sky shader
        ])
        .then(() => return new SkyProgram({name: "sky", fragShader: "atmosphereFrag", vertShader: "atmosphereVert"})) // initialize sky program
        .then(() => {

            // Initialize sky entity
            let sky = new Sky({
                scale: {
                    x: 2000,
                    y: 2000,
                    z: 2000
                }
            });

            sky.rotation.x =  -90 * Math.PI / 180;
            this.addEntity(sky);
        });

        // console.log(Injector);

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