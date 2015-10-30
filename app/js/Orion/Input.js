import Injector from "Orion/Injector";

class Input{
    constructor(){
        this.canvas = Injector.dependencies.canvas;
        this.init();
    }

    init() {
        this.canvas.addEventListener('keydown', (e) => {
            this.triggerKeyEvent(e.keyCode, 'Keydown');
        }, false);
        
        this.canvas.addEventListener('keyup', (e) => {
            this.triggerKeyEvent(e.keyCode, 'Keyup');
        }, false);
        
        this.canvas.addEventListener('mousedown', (e) => {
            this.triggerMouseEvent(e.pageX, e.pageY, 'Mousedown');
        }, false);
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.triggerMouseEvent(e.pageX, e.pageY, 'Mousemove');
        }, false);
        
        this.canvas.addEventListener('mouseup', (e) => {
            this.triggerMouseEvent(e.pageX, e.pageY, 'Mouseup');
        } , false);
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
    
    triggerMouseEvent(pageX, pageY, type) {
        if (window.CustomEvent) {
		        var event = new CustomEvent('trigger'+type+'Event', {detail: {page: {x: pageX, y: pageY}}});
		    } else {
            var event = document.createEvent('trigger' + type + 'Event');
                event.initCustomEvent('trigger' + type + 'Event', true, true, {page: {x: pageX, y: pageY}});
        }

		    return document.dispatchEvent(event);
    }
}

export default Input;
