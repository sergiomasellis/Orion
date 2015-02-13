(function() {
	'use strict';

	var Injector = O.Class.create('O.Injector', function Injector() {
		this.dependecies = {};
	});

	Injector.prototype.register = function(name, instance){
		O.Logger.log("Added to Injector - "+name+" - "+ instance);
	    this.dependecies[name] = instance;
	}

	O.Injector = new Injector;

})();