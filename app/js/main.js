//From Engine
import Config from 'Orion/Config';
import Game from 'Orion/Game';
import Resources from 'Orion/Resource';

//current game
import welcomeScene from 'welcomeScene';

class Main {
    constructor() {

        //get resources
        Resources.load(['img/avatar_sprite.png', 'img/avatar_sprite32.png']);
        Resources.onReady(this.init.bind(this));

    }

    init() {

        Config.setConfig({
            engine: "3d"
        });

          //this.game = new Game;
        //this.welcomeScene = this.game.addScene(new welcomeScene({sceneName: "Welcome"}));

        var a=mat4.create();//mat4 identity matrix
        var final=mat4.create();//mat4 identity matrix
        var rad=.5;
        var v=vec3.fromValues(0.5,0.5,0.5);
        var translate=vec3.fromValues(10,10,10);
        mat4.rotateX(final, a, rad) //Rotates a matrix by the given angle around the X axis
        mat4.rotateY(final, final, rad) //Rotates a matrix by the given angle around the Y axis
        mat4.rotateZ(final, final, rad) //Rotates a matrix by the given angle around the Z axis
        mat4.scale(final, final, v) //Scales the mat4 by the dimensions in the given vec3
        mat4.translate(final, final, v) //Translate a mat4 by the given vector

        console.log(final);

    }
}

window.Main = new Main;
