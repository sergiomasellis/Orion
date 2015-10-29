import Config from "Orion/Config";
import Injector from "Orion/Injector";

class Texture {
	
	constructor(){
		this.textureCache = {};
	}

	pre(){
		this.gl = Injector.dependencies.gl;
	}

	init(){

		for(let imageName of Config.textures){
			this.load(imageName);
		}
	}

	load(img){
		let cubeTexture = this.gl.createTexture();
  		let cubeImage = new Image();

  		cubeImage.onload = () => { this.handleTextureLoaded(cubeImage, cubeTexture, img); }
  		cubeImage.src = img;
	}

	 handleTextureLoaded(img, text, url) {
		this.gl.bindTexture(this.gl.TEXTURE_2D, text);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
		this.gl.generateMipmap(this.gl.TEXTURE_2D);
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);

		url = url[0].split("/");
      	url = url[url.length-1].split(".")[0];

		this.textureCache[url] = text;
	}
}

export default new Texture;