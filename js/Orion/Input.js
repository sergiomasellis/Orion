(function(){

	var input = O.Class.extend(O.Game.Controller, 'O.Game.Controller.Input', function Input(options, dependencies) {
		this.canvas = O.Injector.dependencies.canvas;

		this.whichKey = "";

		this.init();
	});

	input.prototype.init = function() {
		this.canvas.addEventListener('keypress', this.captureKeyEvent.bind(this), false);
	}

	input.prototype.captureKeyEvent = function(event) {
		this.triggerKeyEvent(event.keyCode);
		return event;
	}

	input.prototype.triggerKeyEvent = function(keyCode) {

		if (window.CustomEvent) {
		  var event = new CustomEvent('triggerKeyEvent', {detail: {keyCode: keyCode}});
		} else {
		  var event = document.createEvent('triggerKeyEvent');
		  event.initCustomEvent('triggerKeyEvent', true, true, {keyCode: keyCode});
		}

		document.dispatchEvent(event);	
	}

})();