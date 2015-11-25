import Injector from 'Orion/Injector';
import Shader from 'Orion/Shader';
import Utils from 'Orion/Utils';
import math from 'Orion/Math';

class Camera {

    constructor(options = {}) {
        this.options = Utils.extend(this.options, options);
        this.init();
    }

    init() {

        this.uuid = this.options.uuid || Utils.generateUUID();

        this.distance = this.options.distance || {x:0, y:0, z:0};
        this.nearClip = this.options.nearClip || 0.1;
        this.farClip = this.options.farClip || 1000.0;
        this.fieldOfView = this.options.fieldOfView || Math.PI*0.3;
        this.aspectRatio = this.options.aspectRatio || Injector.get("canvas").width / Injector.get("canvas").height;

        this.isFocused = this.options.focus || false;
        this.focus = this.options.focus || {x: 0.0, y: 0.0, z: 0.0, rotation: {x: 0.0, y: 0.0, z: 0.0}};

        this.rotation = this.options.rotation || {x:0, y:0, z:0};
        this.x = this.options.x || 0.0;
        this.y = this.options.y || 0.0;
        this.z = this.options.z || 0.0;

        // modes of camera behaviour
        this.modes = ["follow", "orbit", "dolly", "pan"];
        this.currentMode = this.options.currentMode || this.modes[1];

        // frustum
        this.leftFrustum = vec3.fromValues(1.0, 0.0, 0.0);
        this.upFrustum = vec3.fromValues(0.0, 1.0, 0.0);
        this.direction = vec3.fromValues(0.0, 0.0, 1.0);

        // orbit variables
        this.orbitAmount = this.options.orbitAmount || {x: 0, y: -0.005, z: -0.005};

        // pan variables
        this.panAmount = this.options.panAmount || {x: 0, y: -0.0005, z: -0.0005};

        window.cam = this;

        this.pMatrix = mat4.create();
    }

    update(dt) {

        if(this.isFocused){

            switch (this.currentMode){

                // follow a point
                case this.modes[0]:
                    this.follow();
                break;

                // orbit a point
                case this.modes[1]:
                    this.orbit();
                break;

                // dolly around point
                case this.modes[2]:
                    this.dolly();
                break;

                // pan a point
                case this.modes[3]:
                    this.pan();
                break;
            }
        }

        mat4.identity(this.pMatrix);
        mat4.perspective(this.pMatrix, this.fieldOfView, Injector.get("gl").viewportWidth / Injector.get("gl").viewportHeight, this.nearClip, this.farClip);
        mat4.translate(this.pMatrix, this.pMatrix, [0.0, 0.0, this.distance.z]);

        mat4.rotate(this.pMatrix, this.pMatrix, this.rotation.x, [1.0, 0.0, 0.0]);
        mat4.rotate(this.pMatrix, this.pMatrix, this.rotation.y+Math.PI, [0.0, 1.0, 0.0]);

        mat4.translate(this.pMatrix, this.pMatrix, [0.0, this.distance.y, 0.0]);

        mat4.translate(this.pMatrix, this.pMatrix, [this.x, this.y, this.z]);

        Injector.get("gl").uniformMatrix4fv(Shader.shaderProgram.pMatrixUniform, false, this.pMatrix);

    }

    lookAt(entity) {
        this.focus = {x: entity.x, y: entity.y, z: entity.z, rotation: {x: entity.rotation.x, y: entity.rotation.y, z: entity.rotation.z}};
        console.log("Camera: focus changed to", entity.options.name);
        this.isFocused = true;
    }

    orbit () {

        // a pan based around focus position
        this.x = -this.focus.x;
        this.y = -this.focus.y;
        this.z = -this.focus.z;

        this.rotation.y += this.orbitAmount.y;
        this.rotation.x += this.orbitAmount.x;
        this.rotation.z += this.orbitAmount.z;
    }

    dolly () {
        // move towards a z until distance to point is 0
        let distance = Math.round(Math.distance2D({x: this.x, y: this.z}, {x: -this.focus.x, y: -this.focus.z}));

        //check distance
        if( distance > 0  && distance < 40) {

            console.log(Math.round(Math.distance2D({x: this.x, y: this.z}, {x: -this.focus.x, y: -this.focus.z})));

            this.x  -= this.focus.x * 0.5;
            // this.y  -= this.focus.y;
            this.z  -= this.focus.z * 0.5;

            // face the point
            this.rotation.x = -this.focus.rotation.x;
            this.rotation.y = -this.focus.rotation.y;
            this.rotation.z = -this.focus.rotation.z;

        }

    }

    pan () {
        // sorta like orbit except the oribit of the ortation is based off camera position?
        this.rotation.y += this.orbitAmount.y;
        this.rotation.x += this.orbitAmount.x;
        this.rotation.z += this.orbitAmount.z;
    }

    follow () {

        // follows moves camera behind point and rotates with a point

        this.x = -this.focus.x;
        this.y = -this.focus.y;
        this.z = -this.focus.z;

        this.rotation.x = -this.focus.rotation.x;
        this.rotation.y = -this.focus.rotation.y;
        this.rotation.z = -this.focus.rotation.z;
    }

}


export default Camera;