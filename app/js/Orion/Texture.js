import Config from "Orion/Config";
import Injector from "Orion/Injector";

class Texture {
	
	constructor(){
		this.textureCache = {};
    	this.allTextureCompiled = false;
    	this.readyCallbacks = [];
    	this.textureCount = 0;
	}

	init(){
	    this.gl = Injector.dependencies.gl;
	    return this;
	}

	load(multipleArrayOfTextures){
      for(let item of multipleArrayOfTextures) {
        this._load(item[0], item[1]); // go through array pass Name and URL
      }
  	}

  	_load(name, url){
  		console.log("Texture: Fetching - ", url);

  		if(this.textureCache[name]){
			return this.textureCache[name]; // return texture
      	}else{
			this.textureCache[name] = {};
			this.textureCache[name].ready = false;
			this.textureCache[name].texture = this.gl.createTexture();
			this.textureCache[name].image = new Image();
			this.textureCache[name].image.onload = () => { this.handleTextureLoaded(name); }.bind(this)
			this.textureCache[name].image.src = url;
      	}
  	}

  	onReady(func){
    	this.readyCallbacks.push(func);
  	}

	handleTextureLoaded(name) {
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureCache[name].texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.textureCache[name].image);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
		this.gl.generateMipmap(this.gl.TEXTURE_2D);
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);

		this.textureCache[name].compiledTexture = this.textureCache[name].texture;
		this.textureCache[name].ready = true;
		this.textureCache[name].id = this.textureCount;
		this.textureCount++;

		// after texture was setup
		this.gl.activeTexture(this.gl.TEXTURE0+this.textureCache[name].id);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureCache[name].compiledTexture);

		// check if all are completed
		this.allTextureCompiled = true;
		for (let prop in this.textureCache) {

			if (this.textureCache.hasOwnProperty(prop)) {

			  if(this.textureCache[prop].ready == false){
			     this.allTextureCompiled = false;
			     break;
			  }
			}
		}

		if(this.allTextureCompiled){
			console.log("Texture: All textures compiled");

			this.readyCallbacks.forEach((func) => {
		        func();
		    }.bind(this));

		}
	}
}



export default new Texture;