import Scene from "Orion/Scene";
import Grid from "Orion/Grid";

import Player from "player";
import frinlet from "frinlet";
import owl from "owl";

class welcomeScene extends Scene {
    init() {

    	// let owlEntity = new owl({name: "Stevoid1990"});
    	// this.addEntity(owlEntity);

     	let player = [];

        for (var i = 0; i < 1; i++) {
        	let name = "frinlet"+i;
        		player[i] = new frinlet({name: name});
        		player[i].z = -i;
        	this.addEntity(player[i]);
        }


    }
}

export default welcomeScene;
