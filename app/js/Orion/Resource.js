
class Resource {
    constructor(){
        this.resourceCache = {};
        this.loading = [];
        this.readyCallbacks = [];
    }

    load(urlOrArr){
        var self = this;
        if(urlOrArr instanceof Array){
            urlOrArr.forEach(function (url) {
                self._load(url);
            });
        }else{
            this._load(urlOrArr);
        }
    }

    _load(url){
        console.log("Fetching Resource From:", url);
        var self = this;
        if(this.resourceCache[url]){
            return this.resourceCache[url];
        }else{
            var img = new Image();
            img.onload = function(){
                self.resourceCache[url] = img;

                if(self.isReady()){
                    self.readyCallbacks.forEach(function (func) {
                        func();
                    });
                }
            }

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

export default new Resource;
