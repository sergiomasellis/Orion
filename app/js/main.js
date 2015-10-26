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

        this.game = new Game;
        this.welcomeScene = this.game.addScene(new welcomeScene({sceneName: "Welcome"}));


    }
}

window.Main = new Main;
