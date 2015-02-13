(function(){

	var controller = O.Class.extend(O.Game, 'O.Game.Controller', function Controller(options, dependencies) {
		
		this.dependencies = dependencies;
        this.options = O.Utils.extend({}, this.options, options);

        this.canvas = O.Injector.dependencies.canvas;
        this.context =  O.Injector.dependencies.context;
        this.gl = this.context;

        this.input = new O.Game.Controller.Input;

		this.init();
	});

	controller.prototype.init = function() {
		document.addEventListener("triggerKeyEvent", this.move);
	}

	controller.prototype.move = function(details) {

		if(details.detail.keyCode === 119)
			O.Logger.log("Moving Forward");

		if(details.detail.keyCode === 115)
			O.Logger.log("Moving Backwards");

		if(details.detail.keyCode === 97)
			O.Logger.log("Moving Left");

		if(details.detail.keyCode === 100)
			O.Logger.log("Moving Right");

	}

})();