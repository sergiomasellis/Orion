(function() {
	'use strict';

	var Logger = O.Class.create('O.Logger', function Logger() {});

	Logger.prototype.error = function(msg){
	    console.log("%c Log: "+msg+" ", 'background: #222; color: rgb(255, 0, 0)');
	}

	Logger.prototype.warning = function (msg) {
	    console.log("%c Log: "+msg+" ", 'background: #222; color: rgb(247, 175, 44)');
	}

	Logger.prototype.log = function (msg) {
	    console.log("%c Log: "+msg+" ", 'background: #222; color: #bada55');
	}

	O.Logger = new Logger;

})();