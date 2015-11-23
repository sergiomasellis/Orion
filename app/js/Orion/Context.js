import Config from 'Orion/Config';
import Injector from 'Orion/Injector';

class Context {
    constructor() {
      //select canvas
      this.canvas = document.getElementById("mainCanvas");
      this.canvas.focus();

      //get 2d context
      this.context = (Config.engine === "2d") ? this.canvas.getContext('2d') : this.canvas.getContext("webgl", {antialias: true}) || this.canvas.getContext("experimental-webgl");
      this.setScale = true;
      this.gl = this.context; //set webgl context

      //enable depth test or you get weird shit.. D: (thanks frinlet)
      this.gl.enable(this.gl.DEPTH_TEST);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      this.gl.enable(this.gl.BLEND);
      this.gl.enable(this.gl.CULL_FACE);


      //set canvas width
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;

      //set webgl viewport
      this.gl.viewportWidth = this.width;
      this.gl.viewportHeight = this.height;

      console.log("Context: Orion Engine - ", Config.engine);
      // console.log("Orion Engine Context: ", this.gl);

      // Add instances to the injector used in input.js
      Injector.register('canvas', this.canvas);

      if(Config.get("engine") == "2d") { 
        Injector.register('context', this.context); 
      }else{
        Injector.register('gl', this.gl);
      }

      return this.context;
    }
}

export default Context;
