class Model {
	constructor(){
		this.modelCache = {};
    this.bufferedModels = {};
    this.allModelsLoaded = false;
    this.readyCallbacks = [];
    	window.Model = this;
	}
	init(){}
	load(multipleArrayOfModels){
		// console.log("Models: loading - ", multipleArrayOfModels);
	  for(let item of multipleArrayOfModels) {
        this._load(item[0], item[1]); // go through array pass ID/NAME and URL
     }
	}

	_load(id, url){

		console.log("Model: Fetching - ", url);
		
		if(this.modelCache[id] != undefined && this.modelCache[id].ready == true){
          return this.modelCache[id]; // return model information
    	}else{
      	
      	let modelRequest = new XMLHttpRequest();
        	this.modelCache[id] = {};
        	this.modelCache[id].ready = false;

      		modelRequest.onreadystatechange = () => {
      			if (modelRequest.readyState == 4 && modelRequest.status == 200) {

      				// Get reponse text from ajax/XMLHttpRequest and parse from strings to JS using JSON.parse
      				this.modelCache[id] = JSON.parse(modelRequest.responseText);
      				this.modelCache[id].ready = true;
              		this.bufferedModels[id] = false;

      				// Asume all models are loaded unless this proves false;
      					this.allModelsLoaded = true;
      					for (var prop in this.modelCache) {
      						if (this.modelCache.hasOwnProperty(prop)) {
      							if(this.modelCache[prop].ready == false){
      								this.allModelsLoaded = false;
      								break;
      							}
      						}
              	}

              		// If all models are loaded then run all the functions in the readyCallbacks array
              		if(this.allModelsLoaded){
                      		console.log("Model: All Models Loaded");
      						this.readyCallbacks.forEach((func) => {
      							func();
      						}.bind(this));
              		}


      			}
      		}.bind(this);

      		modelRequest.open("GET", url, true);
        	modelRequest.send();
      	}

	}
	onReady(func){
    	this.readyCallbacks.push(func);
  	}
}

export default new Model;