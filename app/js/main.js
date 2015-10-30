//From Engine
import Config from 'Orion/Config';
import Game from 'Orion/Game';


//current game
import welcomeScene from 'welcomeScene';

class Main {
    constructor() {

      // Config engine first listing images and shaders
      Config.set({
          engine: "3d",
          images: [
              'img/avatar_sprite.png', 
              'img/avatar_sprite32.png'
          ],
          textures: [
              ['dragon', 'img/micro_dragon_col.png'],
              ['frinlet', 'img/character.png'],
              ['stormtrooper', 'img/stormtrooper.png']
          ],
          shaders: [
            ['js/shaders/frag.glsl', 'frag'],
            ['js/shaders/vert.glsl', 'vert']
          ],
          models: [
            ['frinlet','js/models/frinlet.json'],
            ['owl','js/models/owl.json'],
            ['dragon','js/models/dragon.json'],
            ['cube','js/models/cube.json'],
            ['stormtrooper','js/models/stormtrooper.json']
          ]
      });

      this.init();
    }

    init() {
        this.game = new Game;
        this.welcomeScene = this.game.addScene(new welcomeScene({sceneName: "Welcome"}));
    }
}

window.Main = new Main;
