import Injector from "Orion/Injector";

class Input{
    constructor(){
        this.canvas = Injector.dependencies.canvas;
        this.init();
    }

    init() {
        this.canvas.addEventListener('keydown', this.captureKeyEvent.bind(this), false);
        this.canvas.addEventListener('keyup', this.captureKeyEvent.bind(this), false);
    }

    captureKeyEvent(event) {
        this.triggerKeyEvent(event.keyCode, event.type);
		    return event;
    }

    triggerKeyEvent(keyCode, type) {
        if (window.CustomEvent) {
		        var event = new CustomEvent('trigger'+type+'Event', {detail: {keyCode: keyCode}});
		    } else {
            var event = document.createEvent('trigger' + type + 'Event');
                event.initCustomEvent('trigger' + type + 'Event', true, true, {keyCode: keyCode});
        }

		    return document.dispatchEvent(event);
    }
}

export default Input;
