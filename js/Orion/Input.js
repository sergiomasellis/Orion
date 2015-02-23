(function(){
    /**
     * Input Class
     *
     * @class
     * @name O.Game.Controller.Input
     * @extends O.Game.Controller
     *
     * @constructor
     *
     * @exports Input as O.Game.Controller.Input
     */
	var Input = O.Class.extend(O.Game.Controller, 'O.Game.Controller.Input', function Input() {
		this.canvas = O.Injector.dependencies.canvas;
		this.init();
	});

	Input.prototype.init = function() {
		this.canvas.addEventListener('keydown', this.captureKeyEvent.bind(this), false);
		this.canvas.addEventListener('keyup', this.captureKeyEvent.bind(this), false);
	}

	Input.prototype.captureKeyEvent = function(event) {
		this.triggerKeyEvent(event.keyCode, event.type);
		return event;
	}

	Input.prototype.triggerKeyEvent = function(keyCode, type) {

		if (window.CustomEvent) {
		  var event = new CustomEvent('trigger'+type+'Event', {detail: {keyCode: keyCode}});
		} else {
            var event = document.createEvent('trigger' + type + 'Event');
                event.initCustomEvent('trigger' + type + 'Event', true, true, {keyCode: keyCode});
        }

		document.dispatchEvent(event);	
	}

})();