import Scene from "Orion/Scene";
import Player from "player";

class welcomeScene extends Scene {
    init(){
      this.player = this.addEntity(new Player);
    }
}

export default welcomeScene;