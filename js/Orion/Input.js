(function(){

	var input = O.Class.extend(O.Game.Controller, 'O.Game.Controller.Input', function Input(options, dependencies) {
		
		// this.dependencies = dependencies;
  //       this.options = dependencies.utils.extend({}, this.options, options);

  //       this.canvas = dependencies.canvas;
  //       this.context = dependencies.context;
  //       this.gl = this.context;

		// this.init();
	});

	input.prototype.init = function() {
		
		this.canvas.addEventListener('keydown', this.captureKeyEvent);
	}

	input.prototype.captureKeyEvent = function(event) {
		console.log('event');
		return event;
	};

})();