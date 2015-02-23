(function(){
    'use strict';
    /**
     * Entity Class
     *
     * @class
     * @name O.Game.Entity
     * @extends O.Game
     *
     * @constructor
     * @param options config settings of the game class
     * @param dependencies instances of other classes
     *
     * @exports entity as O.Game.Entity
     */
	var Entity = O.Class.extend(O.Game, 'O.Game.Entity', function Entity(options, dependencies) {
		
		this.dependencies = dependencies;
        this.options = O.Utils.extend({}, this.options, options);

        this.canvas = O.Injector.dependencies.canvas;
        this.preRenderCanvas = O.Injector.dependencies.preRenderCanvas;
        this.context =  O.Injector.dependencies.context;
        this.gl = this.context;

		this.buffered = this.options.buffer || false;
		this.rotate = this.options.rotate  || 0;
		this.uuid = this.options.uuid || O.Utils.generateUUID();
		this.x = this.options.x || 0;
		this.y = this.options.y || 0;
		this.z = this.options.z || 0;

		this.init();
	});

    Entity.prototype.init = function() {}

    Entity.prototype.update = function() {}

    Entity.prototype.draw = function() {}

})();