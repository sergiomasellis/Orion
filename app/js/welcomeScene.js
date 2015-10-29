import Scene from "Orion/Scene";
import Grid from "Orion/Grid";

import Player from "player";
import frinlet from "frinlet";

class welcomeScene extends Scene {
    init() {
    	// let player = new frinlet({name: "frinlet"});
     //    this.frinlet = this.addEntity(player);

     //    let player2 = new frinlet({name: "frinlet2"});
     //    player2.x = 1.3;
     //    this.frinlet2 = this.addEntity(player2);

     let player = [];

        for (var i = 0; i < 10000; i++) {
        	let name = "frinlet"+i;
        		player[i] = new frinlet({name: name});
        		// player[i].x;

        	this.addEntity(player[i]);
        }   
        
    }
}

export default welcomeScene;
