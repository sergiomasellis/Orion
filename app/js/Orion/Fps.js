class Fps {
	constructor(){
		// Select FPS div
		this.fpsContainer = document.getElementById("fps");

		// Timer for animation delta
		this.lastTime = 0;
		this.currentTime = 0;
		this.deltaTime = 0;

		// Initialize timer for FPS Calc
		this.startTime = Date.now();
		this.prevTime = this.startTime;

		// Set default fps values
		this.fpsValue = 0;
		this.fpsMin = Infinity;
		this.fpsMax = 0;
		this.framesFps = 0;
	}

	// TIMER FUNCTIONS
    timerBegin() {
    	this.preUpdate();

        this.startTime = Date.now();
    }

    timerEnd() {
        let time = Date.now();

        this.framesFps++;

        if (time > this.prevTime + 1000) {
            this.fpsValue = Math.round((this.framesFps * 1000) / (time - this.prevTime));
            this.fpsMin = Math.min(this.fpsMin, this.fpsValue);
            this.fpsMax = Math.max(this.fpsMax, this.fpsValue);
            this.fpsContainer.innerHTML = this.fpsValue + ' FPS (' + this.fpsMin + '-' + this.fpsMax + ')';
            this.prevTime = time;
            this.framesFps = 0;
        }

        this.postUpdate();
    }

    preUpdate(){
    	this.currentTime = Date.now();
    	this.deltaTime = (this.currentTime - this.lastTime) / 1000.0;
    }

    postUpdate(){
    	this.lastTime = this.currentTime;
    }

}

export default new Fps;