
class Resource {
    constructor(){
        this.resourceCache = {};
        this.allReasourcesLoaded = false;
    }

    load(urlOrArr){
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            if(urlOrArr.length === 0) {
                // throw new Error("there are no reasources to load!");
                resolve();
            }

            urlOrArr.forEach((url) => {
                this._load(url);
            });
        });
    }

    _load(url, resolve, reject){
        console.log("Resource: Fetching from - ", url);
        var img = new Image();

        img.onload = () => {
            this.resourceCache[url] = img;
            this.resourceCache[url].ready = true;
            if(this.isReady()){
               this.resolve();
            }
        }

        this.resourceCache[url] = {};
        this.resourceCache[url].ready = false;
        img.src = url;
        
    }

    get(url){
        return this.resourceCache[url];
    }

    isReady(){
        // check if all are completed
        this.allReasourcesLoaded = true;
        for (let prop in this.resourceCache) {

            if (this.resourceCache.hasOwnProperty(prop)) {

                if (this.resourceCache[prop].ready === false) {
                    this.allReasourcesLoaded = false;
                    break;
                }
            }
        }

        return this.allReasourcesLoaded;
    }
}

export default new Resource;
