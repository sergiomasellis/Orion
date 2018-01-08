class Resource {
  constructor() {
    this.resourceCache = new Map();
    this.allReasourcesLoaded = false;
  }

  load(urlOrArr) {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      if (urlOrArr.length === 0) {
        // throw new Error("there are no reasources to load!");
        resolve();
      }

      urlOrArr.forEach(url => {
        this._load(url);
      });
    });
  }

  _load(url, resolve, reject) {
    console.log("Resource: Fetching from - ", url);
    var img = new Image();

    img.onload = () => {
      this.resourceCache.set(url, img);
      this.resourceCache.get(url).ready = true;
      if (this.isReady()) {
        this.resolve();
      }
    };

    this.resourceCache.set(url, {});
    this.resourceCache.get(url).ready = false;
    img.src = url;
  }

  get(url) {
    return this.resourceCache.get(url);
  }

  isReady() {
    // check if all are completed
    this.allReasourcesLoaded = true;
    this.resourceCache.forEach(value => {
      if (!value.ready) {
        this.allReasourcesLoaded = false;
      }
    });

    return this.allReasourcesLoaded;
  }
}

export default new Resource();
