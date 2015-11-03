import Utils from 'Orion/Utils';
import Injector from "Orion/Injector";
import Input from "Orion/Input";

export default class Controller {
    constructor(options = {}, dependencies = {}) {

        this.dependencies = dependencies;
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

        this.init(); 
    }

    init() {
        document.addEventListener("triggerKeydownEvent", this.move.bind(this), false);
        document.addEventListener("triggerKeyupEvent", this.stop.bind(this), false);
        
        document.addEventListener("triggerMousedownEvent", (msg) => {
            this.mouse.down.x = msg.detail.e.pageX;
            this.mouse.down.y = msg.detail.e.pageY;
            this.mouse.isDown = true;

        }.bind(this), false);
        
        document.addEventListener("triggerMouseupEvent", (e) => this.mouse.isDown = false, false);
        
        document.addEventListener("triggerMousemoveEvent", (msg) => {
            this.mouse.x = msg.detail.e.pageX;
            this.mouse.y = msg.detail.e.pageY;
            this.mouse.movement.x = msg.detail.e.movementX;
            this.mouse.movement.y = msg.detail.e.movementY;
        }.bind(this), false);
    }
    

    move(details) {

        if (details.detail.keyCode === 87 || details.detail.keyCode === 38) {
            this.direction.W = true;
        }

        if (details.detail.keyCode === 83 || details.detail.keyCode === 40) {
            // console.log("Moving Backwards");
            this.direction.S = true;
        }

        if (details.detail.keyCode === 65 || details.detail.keyCode === 37) {
            // console.log("Moving Left");
            this.direction.A = true;
        }

        if (details.detail.keyCode === 68 || details.detail.keyCode === 39) {
            // console.log("Moving Right");
            this.direction.D = true;
        }

    }

    stop(details) {

        if (details.detail.keyCode === 87 || details.detail.keyCode === 38) {
            this.direction.W = false;
        }

        if (details.detail.keyCode === 83 || details.detail.keyCode === 40) {
            // console.log("Moving Backwards");
            this.direction.S = false;
        }

        if (details.detail.keyCode === 65 || details.detail.keyCode === 37) {
            // console.log("Moving Left");
            this.direction.A = false;
        }

        if (details.detail.keyCode === 68 || details.detail.keyCode === 39) {
            // console.log("Moving Right");
            this.direction.D = false;
        }
    }
}
