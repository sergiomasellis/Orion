import Config from "./Config";
import Fps from "./Fps";

import Injector from "./Injector";
import Context from "./Context";
import Controller from "./Controller";

import Resource from "./Resource";
import Shaders from "./Shader";
import Models from "./Model";
import Texture from "./Texture";
import Program from "./Program";

export default class Game {
  constructor() {
    // Get Context
    this.gl = new Context();

    this.isReady = false;
    this.readyCallbacks = [];
    this.init();
  }

  init() {
    // List of Scenes
    this.sceneList = [];
    this.currentScene = 0;

    // Setup keyboard controls
    if (Config.get("controller")) {
      this.controller = new Controller();
      Injector.register("controller", this.controller);
    }

    // Setup gameOnReady Callback
    Injector.register("game", this);

    // Get Resources uses promises!
    Promise.all([Resource.load(Config.get("images")), Texture.load(Config.get("textures")), Shaders.load(Config.get("shaders")), Models.load(Config.get("models"))])
      .then(() => {
        // Creates Base program for basic model rendering
        return new Program();
      })
      .then(() => {
        console.log("Game: All resources loaded and compiled");
        this.startGameEngine();
      });
  }

  onReady(func) {
    this.readyCallbacks.push(func);
  }

  startGameEngine() {
    console.log("Game: Engine Starting");
    this.isReady = true;

    // let scenes know to init now
    this.readyCallbacks.forEach(func => {
      func();
    });

    this.raf();
  }

  // GAME LOOP FUNCTIONS
  raf() {
    // Loop over update and draw functions
    Fps.timerBegin();
    this.update(Fps.deltaTime);
    this.draw();
    Fps.timerEnd();

    // Call this.raf on every frame
    window.requestAnimationFrame(this.raf.bind(this));
  }

  update(dt) {
    let i = 0,
      sl = this.sceneList,
      l = sl.length;

    if (l > 0) {
      // Fastest possible loop
      while (i < l) {
        if (this.currentScene === i) sl[i].update(dt);
        i++;
      }
    }
  }

  draw() {
    // console.log(this);
    let i = 0,
      sl = this.sceneList,
      l = sl.length,
      gl = this.gl;

    // set viewport
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    // reset background to a grey color
    gl.clearColor(0.5, 0.5, 0.5, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (l > 0) {
      while (i < l) {
        if (this.currentScene === i) sl[i].draw();
        i++;
      }
    }
  }

  // SCENE FUNCTIONS
  addScene(scene) {
    this.onReady(() => {
      console.log("Game: Add Scene - ", scene.options.sceneName);
      this.sceneList.push(scene);
    });
    return scene;
  }
}
