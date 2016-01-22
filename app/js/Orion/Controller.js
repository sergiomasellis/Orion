import Utils from './Utils';
import Injector from "./Injector";
import Input from "./Input";

export default class Controller {
    constructor(options = {}) {

        this.options = Utils.extend(this.options, options);

        this.canvas = Injector.get("canvas");
        this.context = Injector.get("gl");

        this.input = new Input;
        this.direction = {};
        this.keysPressed = {};

        this.direction.W = false;
        this.direction.A = false;
        this.direction.S = false;
        this.direction.D = false;

        this.mouse = {};
        this.mouse.down = {};
        this.mouse.movement = {x: 0, y:0};
        this.mouse.isDown = false;
        this.mouse.lastX = 0;
        this.mouse.lastY = 0;
        this.lastMouseMovementTimer = 0;

        this.init();
    }

    init() {
        document.addEventListener("triggerKeydownEvent", this.move.bind(this), false);
        document.addEventListener("triggerKeyupEvent", this.stop.bind(this), false);

        document.addEventListener("triggerMousedownEvent", (msg) => {
            this.mouse.down.x = msg.detail.e.pageX;
            this.mouse.down.y = msg.detail.e.pageY;
            this.mouse.isDown = true;
        }, false);

        document.addEventListener("triggerMouseupEvent", (e) => this.mouse.isDown = false, false);

        document.addEventListener("triggerMousemoveEvent", (msg) => {
            this.mouse.x = msg.detail.e.pageX;
            this.mouse.y = msg.detail.e.pageY;
            this.mouse.movement.x = msg.detail.e.movementX || msg.detail.e.mozMovementX || 0.0;
            this.mouse.movement.y = msg.detail.e.movementY || msg.detail.e.mozMovementY || 0.0;

            this.mouse.lastX = this.mouse.x;
            this.mouse.lastY = this.mouse.y;

            clearInterval(this.lastMouseMovementTimer);
            
            this.lastMouseMovementTimer = setTimeout(() => {
              if(this.mouse.lastY == this.mouse.y && this.mouse.lastX == this.mouse.x) {
                this.mouse.movement.y = 0;
                this.mouse.movement.x = 0;
              }

            }, 500);

        }, false);

    }


    move(details) {

        if (details.detail.keyCode === 87 || details.detail.keyCode === 38) {
            this.direction.W = true;
        }

        if (details.detail.keyCode === 83 || details.detail.keyCode === 40) {
            this.direction.S = true;
        }

        if (details.detail.keyCode === 65 || details.detail.keyCode === 37) {
            this.direction.A = true;
        }

        if (details.detail.keyCode === 68 || details.detail.keyCode === 39) {
            this.direction.D = true;
        }

    }

    stop(details) {

        if (details.detail.keyCode === 87 || details.detail.keyCode === 38) {
            this.direction.W = false;
        }

        if (details.detail.keyCode === 83 || details.detail.keyCode === 40) {
            this.direction.S = false;
        }

        if (details.detail.keyCode === 65 || details.detail.keyCode === 37) {
            this.direction.A = false;
        }

        if (details.detail.keyCode === 68 || details.detail.keyCode === 39) {
            this.direction.D = false;
        }
    }
}
