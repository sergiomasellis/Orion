(function(){
    'use strict';
    /**
     * Scene Class
     *
     * @class
     * @name O.Game.Scene
     * @extends O.Game
     *
     * @constructor
     * @param options config settings of the game class
     * @param dependencies instances of other classes
     *
     * @exports Scene as O.Game.Scene
     */
    var Scene = O.Class.extend(O.Game, 'O.Game.Scene', function Scene(options, dependencies) {

        this.dependencies = dependencies;
        this.options = O.Utils.extend({}, this.options, options);

        this.buffered = this.options.buffer || false;
        this.uuid = this.options.uuid ||  O.Utils.generateUUID();

        this.entityList = [];

        this.init();
    });

    /**
     * Adds entity to a scene list
     * @function
     * @param entity
     * @returns entity
     */
    Scene.prototype.addEntity = function(entity) {
        O.Logger.log("Add Entity - "+ entity.__proto__.fullClassName);
        this.entityList.push(entity);
        return entity;
    }

    Scene.prototype.init = function() {}

    Scene.prototype.update = function() {

        if( this.entityList.length > 0){
            this.entityList.forEach(function(item, i){
                item.update();
            });
        }
    }

    Scene.prototype.draw = function() {

        if( this.entityList.length > 0){
            this.entityList.forEach(function(item, i){
                item.draw();
            });
        }
    }

})();