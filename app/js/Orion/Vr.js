import Injector from './Injector';
import Program from './Program';
import Utils from './Utils';
import math from './Math';

class Vr {


    constructor(options = {}) {
        this.options = Utils.extend(this.options, options);
        this.init();
    }

    init() {
        console.log('Init VR');
        if (navigator.getVRDisplays) {
            navigator.getVRDisplays().then(function (displays) {
            if (displays.length > 0) {
                // We reuse this every frame to avoid generating garbage
                frameData = new VRFrameData();
        
                vrDisplay = displays[0];
        
                // We must adjust the canvas (our VRLayer source) to match the VRDisplay
                var leftEye = vrDisplay.getEyeParameters("left");
                var rightEye = vrDisplay.getEyeParameters("right");
        
                // update canvas width and height based on the eye parameters.
                // For simplicity we will render each eye at the same resolution
                Injector.get("canvas").width = Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2;
                Injector.get("canvas").height = Math.max(leftEye.renderHeight, rightEye.renderHeight);
        
                vrDisplay.requestPresent([{ source: Injector.get("canvas") }]).then(function () {
                vrDisplay.requestAnimationFrame(this.update);
                }).catch(function (err) {
                // Failed to requestPresent
                });
            } else {
                // There are no VR displays connected.
            }
            }).catch(function (err) {
            // VR Displays are not accessible in this context.
            // Perhaps you are in an iframe without the allowvr attribute specified.
            });
        } else {
            // WebVR is not supported in this browser.
        }
    }

    update(){
        vrDisplay.getFrameData(frameData);
        vrDisplay.submitFrame();
    }
}


export default Vr;