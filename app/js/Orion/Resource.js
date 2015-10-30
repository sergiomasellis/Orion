
class Resource {
    constructor(){
        this.resourceCache = {};
        this.loading = [];
        this.readyCallbacks = [];
    }

    load(urlOrArr){
        if(urlOrArr instanceof Array){
            urlOrArr.forEach((url) => {
                this._load(url);
            }.bind(this));
        }else{
            this._load(urlOrArr);
        }
    }

    _load(url){
        // console.log("Resource: Fetching from - ", url);
        if(this.resourceCache[url]){
            return this.resourceCache[url];
        }else{
            var img = new Image();

            img.onload = () => {
                this.resourceCache[url] = img;

                if(this.isReady()){
                    this.readyCallbacks.forEach((func) => {
                        func();
                    }.bind(this));
                }
            }.bind(this)

            this.resourceCache[url] = false;
            img.src = url;
        }
    }

    get(url){
        return this.resourceCache[url];
    }

    isReady(){
        var ready = true;
        for(var k in this.resourceCache){
            if(this.resourceCache.hasOwnProperty(k) && !this.resourceCache[k]){
                ready = false;
            }
        }
        return ready;
    }

    onReady(func){
        this.readyCallbacks.push(func);
    }
}

export default Resource;
