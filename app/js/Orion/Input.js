import Injector from "Orion/Injector";

class Input{
    constructor(){
        this.canvas = Injector.get("canvas");
        this.init();
    }

    init() {

        // Keyboard events
        this.canvas.addEventListener('keydown', (e) => this.triggerKeyEvent(e.keyCode, 'Keydown'), false);
        this.canvas.addEventListener('keyup', (e) => this.triggerKeyEvent(e.keyCode, 'Keyup'), false);

        // Mouse Handlers
        // This handle is used as a pointer for deletion later in this code. refer to line ~49:pointerLockChange();
        this.handleMouseDown = (e) => this.triggerMouseEvent(e, "Mousedown");
        this.handleMouseMove = (e) => this.triggerMouseEvent(e, "Mousemove");
        this.handleMouseUp = (e) => this.triggerMouseEvent(e, "Mouseup");

        // Mouse events
        this.canvas.addEventListener('mousedown', this.handleMouseDown, false);
        this.canvas.addEventListener('mousemove', this.handleMouseMove, false);
        this.canvas.addEventListener('mouseup', this.handleMouseUp, false);

        // Pointer lock API
        this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock || this.canvas.webkitRequestPointerLock;
        this.canvas.addEventListener('click', () => this.canvas.requestPointerLock());

        // Unlock 
        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;

        if ("onpointerlockchange" in document) {
            document.addEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
        } else if ("onmozpointerlockchange" in document) {
            document.addEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
        } else if ("onwebkitpointerlockchange" in document) {
            document.addEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
        }
    }

    pointerLockChange() {
        if(document.pointerLockElement === this.canvas ||
        document.mozPointerLockElement === this.canvas ||
        document.webkitPointerLockElement === this.canvas) {
            //remove mousemove
            // this.canvas.removeEventListener('mousemove', this.handleMouseMove, false);
        } else {
            //re applys mouse move
            // this.canvas.addEventListener('mousemove', this.handleMouseMove, false);
        }
    }
    
    triggerKeyEvent(keyCode, type) {
        // if(keyCode === 27) this.pointerLockChange();
        if (window.CustomEvent) {
		        var event = new CustomEvent('trigger'+type+'Event', {detail: {keyCode: keyCode}});
		    } else {
            var event = document.createEvent('trigger' + type + 'Event');
                event.initCustomEvent('trigger' + type + 'Event', true, true, {keyCode: keyCode});
        }

		return document.dispatchEvent(event);
    }
    
    triggerMouseEvent(e, type) {

        // console.log("type of event is: ", type);

        if (window.CustomEvent) {
		        var event = new CustomEvent('trigger'+type+'Event', {detail: {e: e}});
		    } else {
            var event = document.createEvent('trigger' + type + 'Event');
                event.initCustomEvent('trigger' + type + 'Event', true, true, {e: e});
        }

		return document.dispatchEvent(event);
    }
}

export default Input;
