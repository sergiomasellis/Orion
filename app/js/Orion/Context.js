import Config from 'Orion/Config';
import Injector from 'Orion/Injector';

class Context {
    constructor() {

    }

    init(){
      //select canvas
      this.canvas = document.getElementById("mainCanvas");
      this.canvas.focus();

      //get 2d context
      this.context = (Config.engine === "2d") ? this.canvas.getContext('2d') : this.canvas.getContext("webgl", {antialias: true}) || this.canvas.getContext("experimental-webgl");
      this.setScale = true;
      this.gl = this.context; //set webgl context

      //set canvas width
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;

      //set webgl viewport
      this.gl.viewportWidth = this.width;
      this.gl.viewportHeight = this.height;

      console.log("Context: Orion Engine - ", Config.engine);
      // console.log("Orion Engine Context: ", this.gl);

      // Add instances to the injector
      Injector.register('canvas', this.canvas);
      Injector.register('context', this.context);
      Injector.register('gl', this.gl);

      return this.context;
    }
}

export default new Context;
