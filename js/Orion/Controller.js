(function(){

	var controller = O.Class.extend(O.Game, 'O.Game.Controller', function Controller(options, dependencies) {
		
		this.dependencies = dependencies;
        this.options = O.Utils.extend({}, this.options, options);

        this.canvas = O.Injector.dependencies.canvas;
        this.context =  O.Injector.dependencies.context;
        this.gl = this.context;

        this.input = new O.Game.Controller.Input;
        this.direction = "";

		this.init();
	});

	controller.prototype.init = function() {
		document.addEventListener("triggerkeydownEvent", this.move.bind(this));
		document.addEventListener("triggerkeyupEvent", this.stop.bind(this));
	}

	controller.prototype.move = function(details) {

		if(details.detail.keyCode === 87){
			O.Logger.log("Moving Forward");
			this.direction = "w";
		}

		if(details.detail.keyCode === 83){
			O.Logger.log("Moving Backwards");
			this.direction = "s";
		}

		if(details.detail.keyCode === 65){
			O.Logger.log("Moving Left");
			this.direction = "a";
		}

		if(details.detail.keyCode === 68){
			O.Logger.log("Moving Right");
			this.direction = "d";
		}

	}

	controller.prototype.stop = function() {
		this.direction = "";
	}

})();