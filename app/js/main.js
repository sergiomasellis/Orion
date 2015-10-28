//From Engine
import Config from 'Orion/Config';
import Game from 'Orion/Game';


//current game
import welcomeScene from 'welcomeScene';

class Main {
    constructor() {

      // Config engine first listing images and shaders
      Config.setConfig({
          engine: "3d",
          images: ['img/avatar_sprite.png', 'img/avatar_sprite32.png'],
          shaders: [
            ['js/shaders/frag.glsl', 'frag'],
            ['js/shaders/vert.glsl', 'vert']
          ],
          models: ['js/models/frinlet.json']
      });

      this.init();
    }

    init() {
        this.game = new Game;
        this.welcomeScene = this.game.addScene(new welcomeScene({sceneName: "Welcome"}));
    }
}

window.Main = new Main;
