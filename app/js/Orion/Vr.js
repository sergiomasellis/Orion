import Injector from "./Injector";
import Program from "./Program";
import Utils from "./Utils";
import math from "./Math";

class Vr {
  constructor(options = {}) {
    this.options = Utils.extend(this.options, options);
    // We reuse this every frame to avoid generating garbage
    this.frameData = new VRFrameData();
    this.vrDisplay = null;
    this.init();
  }

  init() {
    if (navigator.getVRDisplays) {
      console.log("WebVR 1.1 supported");

      // Then get the displays attached to the computer

      navigator.getVRDisplays().then(displays => {
        // If a display is available, use it to present the scene
        if (displays.length > 0) {
          this.vrDisplay = displays[0];
          var btn = document.querySelector(".vr button");
        
          btn.addEventListener("click", () => {
            this.vrDisplay.requestPresent([{ source: Injector.get("canvas") }]).then(() => {
              console.log("Presenting to WebVR display");
              // Set the canvas size to the size of the vrDisplay viewport

              // let engine know vr should start used for camera.js
              Injector.get("game").isVrStarted = true;

              var leftEye = this.vrDisplay.getEyeParameters("left");
              var rightEye = this.vrDisplay.getEyeParameters("right");

              this.vrStarted = true;

              Injector.get("canvas").width = Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2;
              Injector.get("canvas").height = Math.max(leftEye.renderHeight, rightEye.renderHeight);
            });
          });
        } else {
          console.log("No Vr Displays found");
        }
      });
    }
  }

  update() {
    if (this.vrDisplay != null) {
      this.vrDisplay.getFrameData(this.frameData);
      // console.log(this.frameData.pose);
      this.vrDisplay.submitFrame();
    }
  }
}

export default Vr;
