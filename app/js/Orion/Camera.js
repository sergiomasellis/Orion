import Injector from "./Injector";
import Utils from "./Utils";
import Config from "./Config";

import * as glMatrix from "gl-matrix";

class Camera {
  constructor(options = {}) {
    this.options = Utils.extend(this.options, options);
    this.init();
  }

  init() {
    this.uuid = this.options.uuid || Utils.generateUUID();

    this.distance = this.options.distance || { x: 0, y: 0, z: 0 };
    this.nearClip = this.options.nearClip || 0.1;
    this.farClip = this.options.farClip || 1000.0;
    this.zoom = this.options.zoom || 1;
    this.fieldOfView = this.options.fieldOfView || this.zoom;
    this.aspectRatio = this.options.aspectRatio || Injector.get("canvas").width / Injector.get("canvas").height;

    this.isFocused = this.options.focus || false;
    this.focus = this.options.focus || { x: 0.0, y: 0.0, z: 0.0, rotation: { x: 0.0, y: 0.0, z: 0.0 } };

    this.rotation = this.options.rotation || { x: 0, y: 0, z: 0 };
    this.x = this.options.x || 0.0;
    this.y = this.options.y || 0.0;
    this.z = this.options.z || 0.0;

    // modes of camera behaviour
    this.modes = ["follow", "orbit"];
    this.currentMode = this.options.currentMode || this.modes[0];

    // frustum
    this.leftFrustum = glMatrix.vec3.fromValues(1.0, 0.0, 0.0);
    this.upFrustum = glMatrix.vec3.fromValues(0.0, 1.0, 0.0);
    this.direction = glMatrix.vec3.fromValues(0.0, 0.0, 1.0);

    // orbit variables
    this.orbitAmount = this.options.orbitAmount || { x: 0, y: -0.005, z: -0.005 };

    // pan variables
    this.panAmount = this.options.panAmount || { x: 0, y: -0.0005, z: -0.0005 };

    this.pMatrix = glMatrix.mat4.create();

    this.vx = 0;
    this.vz = 0;
    this.force = 0.05;

    // vr camera configs
    this.vr = this.options.vr || Config.get("vr") || false;
    this.vrStarted = false;
    if (this.vr) {
      this.pLeftEyeMatrix = glMatrix.mat4.create();
      this.pRightEyeMatrix = glMatrix.mat4.create();
    }
  }

  update() {
    if (this.isFocused) {
      switch (this.currentMode) {
        // follow a point
        case this.modes[0]:
          this.follow();
          break;

        // orbit a point
        case this.modes[1]:
          this.orbit();
          break;
      }
    }

    if (this.vr && Injector.get("game").isVrStarted) {
      // You can get the position, orientation, etc. of the display from the current frame's pose
      // curFramePose is a VRPose object

      var curFramePose = Injector.get("vr").frameData.pose;
      var curPos = curFramePose.position;
      var curOrient = curFramePose.orientation;

      let leftEyePosition = Injector.get("vr").frameData.leftProjectionMatrix;

      // glMatrix.mat4.identity(leftEyePosition);
      // glMatrix.mat4.perspective(leftEyePosition, this.fieldOfView, Injector.get("gl").viewportWidth / Injector.get("gl").viewportHeight, this.nearClip, this.farClip);
      glMatrix.mat4.translate(leftEyePosition, leftEyePosition, [0.0, 0.0, this.distance.z]);

      glMatrix.mat4.rotate(leftEyePosition, leftEyePosition, this.rotation.x, [1.0, 0.0, 0.0]);
      glMatrix.mat4.rotate(leftEyePosition, leftEyePosition, this.rotation.y + Math.PI, [0.0, 1.0, 0.0]);

      glMatrix.mat4.translate(leftEyePosition, leftEyePosition, [0.0, this.distance.y, 0.0]);
      glMatrix.mat4.translate(leftEyePosition, leftEyePosition, [this.x, this.y, this.z]);

      Injector.get("gl").uniformMatrix4fv(Injector.get("baseProgram").shaderProgram.pMatrixUniform, false, leftEyePosition);

      // somehow update right eye
      let rightEyePosition = Injector.get("vr").frameData.rightProjectionMatrix;

      // glMatrix.mat4.identity(rightEyePosition);
      // glMatrix.mat4.perspective(rightEyePosition, this.fieldOfView, Injector.get("gl").viewportWidth / Injector.get("gl").viewportHeight, this.nearClip, this.farClip);
      glMatrix.mat4.translate(rightEyePosition, rightEyePosition, [0.0, 0.0, this.distance.z]);

      glMatrix.mat4.rotate(rightEyePosition, rightEyePosition, this.rotation.x, [1.0, 0.0, 0.0]);
      glMatrix.mat4.rotate(rightEyePosition, rightEyePosition, this.rotation.y + Math.PI, [0.0, 1.0, 0.0]);

      glMatrix.mat4.translate(rightEyePosition, rightEyePosition, [0.0, this.distance.y, 0.0]);
      glMatrix.mat4.translate(rightEyePosition, rightEyePosition, [this.x, this.y, this.z]);

      Injector.get("gl").uniformMatrix4fv(Injector.get("baseProgram").shaderProgram.pMatrixUniform, false, rightEyePosition);
    } else {
      glMatrix.mat4.identity(this.pMatrix);
      glMatrix.mat4.perspective(this.pMatrix, this.fieldOfView, Injector.get("gl").viewportWidth / Injector.get("gl").viewportHeight, this.nearClip, this.farClip);
      glMatrix.mat4.translate(this.pMatrix, this.pMatrix, [0.0, 0.0, this.distance.z]);

      glMatrix.mat4.rotate(this.pMatrix, this.pMatrix, this.rotation.x, [1.0, 0.0, 0.0]);
      glMatrix.mat4.rotate(this.pMatrix, this.pMatrix, this.rotation.y + Math.PI, [0.0, 1.0, 0.0]);

      glMatrix.mat4.translate(this.pMatrix, this.pMatrix, [0.0, this.distance.y, 0.0]);
      glMatrix.mat4.translate(this.pMatrix, this.pMatrix, [this.x, this.y, this.z]);

      Injector.get("gl").uniformMatrix4fv(Injector.get("baseProgram").shaderProgram.pMatrixUniform, false, this.pMatrix);
    }
  }

  lookAt(entity) {
    this.focus = { x: entity.x, y: entity.y, z: entity.z, rotation: { x: entity.rotation.x, y: entity.rotation.y, z: entity.rotation.z } };
    console.log("Camera: focus changed to", entity.options.name);
    this.isFocused = true;
  }

  orbit() {
    // a pan based around focus position
    this.x = -this.focus.x;
    this.y = -this.focus.y;
    this.z = -this.focus.z;

    this.rotation.y += this.orbitAmount.y;
    this.rotation.x += this.orbitAmount.x;
    this.rotation.z += this.orbitAmount.z;
  }

  follow() {
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
