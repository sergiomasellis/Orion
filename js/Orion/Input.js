(function(){

	var input = O.Class.extend(O.Game.Controller, 'O.Game.Controller.Input', function Input(options, dependencies) {
		this.canvas = O.Injector.dependencies.canvas;

		this.whichKey = "";

		this.init();
	});

	input.prototype.init = function() {
		this.canvas.addEventListener('keydown', this.captureKeyEvent.bind(this), false);
		this.canvas.addEventListener('keyup', this.captureKeyEvent.bind(this), false);
	}

	input.prototype.captureKeyEvent = function(event) {
		this.triggerKeyEvent(event.keyCode, event.type);
		event.preventDefault();
		return event;
	}

	input.prototype.triggerKeyEvent = function(keyCode, type) {

		if (window.CustomEvent) {
		  var event = new CustomEvent('trigger'+type+'Event', {detail: {keyCode: keyCode}});
		} else {
		  var event = document.createEvent('trigger'+type+'Event');
		  event.initCustomEvent('trigger'+type+'Event', true, true, {keyCode: keyCode});
		}

		document.dispatchEvent(event);	
	}

})();