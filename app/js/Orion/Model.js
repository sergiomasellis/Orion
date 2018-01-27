class Model {
  constructor() {
    this.modelCache = new Map();
    this.bufferedModels = new Map();
    this.readyCallbacks = new Map();
    this.allModelsLoaded = false;
  }

  init() {}

  load(multipleArrayOfModels) {
    // console.log("Models: loading - ", multipleArrayOfModels);
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      for (let item of multipleArrayOfModels) {
        this._load(item[0], item[1]); // go through array pass ID/NAME and URL
      }
    });
  }

  _load(id, url) {
    console.log("Model: Fetching - ", url);

    let modelRequest = new XMLHttpRequest();
    this.modelCache.set(id, {});
    this.modelCache.get(id).ready = false;

    modelRequest.onreadystatechange = () => {
      if (modelRequest.readyState === 4 && modelRequest.status === 200) {
        // Get response text from ajax/XMLHttpRequest and parse from strings to JS using JSON.parse
        this.modelCache.set(id, JSON.parse(modelRequest.responseText));
        this.modelCache.get(id).ready = true;
        this.bufferedModels.set(id, false);

        // Assume all models are loaded unless this proves false;
        this.allModelsLoaded = true;
        this.modelCache.forEach(value => {
          if (value.ready === false) {
            this.allModelsLoaded = false;
            return true;
          }
        });

        // If all models are loaded then run all the functions in the readyCallbacks array
        if (this.allModelsLoaded) {
          console.log("Model: All Models Loaded");
          this.resolve();
        }
      }
    };

    modelRequest.open("GET", url, true);
    modelRequest.send();
  }
}

export default new Model();
