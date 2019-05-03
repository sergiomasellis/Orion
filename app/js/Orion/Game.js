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

// vr
import Vr from "./Vr";

export default class Game {
  constructor() {
    // Get Context
    this.gl = new Context();

    this.isReady = false;
    this.isVrStarted = false;
    this.readyCallbacks = new Set();
    this.init();
  }

  init() {
    // List of Scenes
    this.sceneList = new Map();
    this.currentScene = 0;

    // Setup keyboard controls
    if (Config.get("controller")) {
      this.controller = new Controller();
      Injector.register("controller", this.controller);
    }

    this.baseProgram = null;

    // Setup gameOnReady Callback
    Injector.register("game", this);

    // Get Resources uses promises!
    Promise.all([Resource.load(Config.get("images")), Texture.load(Config.get("textures")), Shaders.load(Config.get("shaders")), Models.load(Config.get("models"))])
      .then(() => {
        // Creates Base program for basic model rendering
        this.baseProgram = new Program();
      })
      .then(() => {
        if (Config.get("vr")) {
          this.vr = new Vr();
          Injector.register("vr", this.vr);
        }
      })
      .then(() => {
        console.log("Game: All resources loaded and compiled");
        this.startGameEngine();
      });
  }

  onReady(func) {
    this.readyCallbacks.add(func);
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
    // Fps.timerBegin();
    this.update(Fps.deltaTime);
    this.draw();
    // Fps.timerEnd();

    // Check if vr is ready
    if (this.isVrStarted) {
      this.vrRaf();
      return false;
    }

    // Call this.raf on every frame
    window.requestAnimationFrame(this.raf.bind(this));
  }

  vrRaf() {
    // Loop over update and draw functions
    // Fps.timerBegin();
    this.vrUpdate(Fps.deltaTime);
    this.vrDraw();
    // Fps.timerEnd();

    // Call this.raf on every frame
    this.vr.vrDisplay.requestAnimationFrame(this.vrRaf.bind(this));
  }

  update(dt) {
    if (this.sceneList.size > 0) {
      // Fastest possible loop
      this.sceneList.forEach((value, index) => {
        if (this.currentScene === index) this.sceneList.get(index).update(dt);
      });
      // console.log('updating')
    }
  }

  vrUpdate(dt) {
    if (this.sceneList.size > 0) {
      // Fastest possible loop
      this.sceneList.forEach((value, index) => {
        if (this.currentScene === index) this.sceneList.get(index).update(dt);
      });

      this.vr.vrDisplay.getFrameData(this.vr.frameData);
    }
  }

  vrDraw() {
    let gl = this.gl;

    // reset background to a grey color
    // gl.clearColor(0.5, 0.5, 0.5, 1);
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.clearColor(0.5, 0.5, 0.5, 1); // Clear to black, fully opaque
    gl.clearDepth(1.0); // Clear everything
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // console.log("in vr draw");

    if (this.sceneList.size > 0) {
      // Fastest possible loop
      this.sceneList.forEach((value, index) => {
        gl.viewport(0, 0, Injector.get("canvas").width * 0.5, Injector.get("canvas").height);
        this.sceneList.get(index).draw();

        gl.viewport(Injector.get("canvas").width * 0.5, 0, Injector.get("canvas").width * 0.5, Injector.get("canvas").height);
        this.sceneList.get(index).draw();

        this.vr.vrDisplay.submitFrame();
      });
    }
  }

  draw() {
    let gl = this.gl;

    // set viewport
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    // console.log('in draw')

    // reset background to a grey color
    // gl.clearColor(0.5, 0.5, 0.5, 1);
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.clearColor(0.5, 0.5, 0.5, 1); // Clear to black, fully opaque
    gl.clearDepth(1.0); // Clear everything
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (this.sceneList.size > 0) {
      // Fastest possible loop
      this.sceneList.forEach((value, index) => {
        if (this.currentScene === index) this.sceneList.get(index).draw();
      });
    }
  }

  // SCENE FUNCTIONS
  addScene(scene) {
    this.onReady(() => {
      console.log("Game: Add Scene - ", scene.options.sceneName);
      let size = this.sceneList.size;
      this.sceneList.set(size++, scene);
    });
    return scene;
  }
}
