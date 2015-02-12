(function(){

	var entity = O.Class.extend(O.Game, 'O.Game.Entity', function Entity(options, dependencies) {
		
		this.dependencies = dependencies;
        this.options = dependencies.utils.extend({}, this.options, options);

        this.canvas = dependencies.canvas;
        this.context = dependencies.context;
        this.gl = this.context;

		this.buffered = this.options.buffer || false;
		this.rotate = this.options.rotate  || 0;
		this.uuid = this.options.uuid || 0;
		this.x = this.options.x || 0;
		this.y = this.options.y || 0;
		this.z = this.options.z || 0;

		this.init();
	});

	entity.prototype.init = function() {}

	entity.prototype.update = function() {}

	entity.prototype.draw = function() {}

})();