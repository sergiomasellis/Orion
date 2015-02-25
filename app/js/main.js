//From Engine
import Config from 'Orion/Config';
import Game from 'Orion/Game';

//current game
import welcomeScene from 'welcomeScene';

class Main {
        constructor() {
            this.init();
        }

        init() {

            Config.setConfig({
			           engine: "2d"
		        });

            this.game = new Game;
            this.welcomeScene = this.game.addScene(new welcomeScene({sceneName: "Welcome"}));
        }
}

window.Main = new Main;
