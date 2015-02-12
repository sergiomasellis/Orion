(function() {
	'use strict';

	var Logger = O.Class.create('O.Logger', function Logger(){
	    this.options = {};
	});

	Logger.prototype.error = function(msg){
	    console.error("Error: ", msg);
	}

	Logger.prototype.warning = function (msg) {
	    console.warn("Warning: ", msg);
	}

	Logger.prototype.log = function (msg) {
	    console.log("Log: ", msg);
	}

})();