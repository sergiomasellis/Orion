(function(){

    var scene = O.Class.extend(O.Game, 'O.Game.Scene', function Scene(options, dependencies) {

        this.dependencies = dependencies;
        this.options = O.Utils.extend({}, this.options, options);

        this.buffered = this.options.buffer || false;
        this.uuid = this.options.uuid ||  O.Utils.generateUUID();

        this.entityList = [];

        this.init();
    });

    scene.prototype.addEntity = function(entity) {
        O.Logger.log("Add Entity - "+ entity.__proto__.fullClassName);
        this.entityList.push(entity);
        return entity;
    }

    scene.prototype.init = function() {}

    scene.prototype.update = function() {

        if( this.entityList.length > 0){
            this.entityList.forEach(function(item, i){
                item.update();
            });
        }
    }

    scene.prototype.draw = function() {

        if( this.entityList.length > 0){
            this.entityList.forEach(function(item, i){
                item.draw();
            });
        }
    }

})();