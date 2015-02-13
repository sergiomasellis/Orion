(function(){

	var controller = O.Class.extend(O.Game, 'O.Game.Controller', function Controller(options, dependencies) {
		
		this.dependencies = dependencies;
        this.options = O.Utils.extend({}, this.options, options);

        this.canvas = dependencies.canvas;
        this.context = dependencies.context;
        this.gl = this.context;

		this.init();
		
	});

	controller.prototype.init = function() {}

})();