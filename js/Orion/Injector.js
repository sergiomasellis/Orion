(function() {
    'use strict';
    /**
     * Injector Class
     *
     * @class
     * @name O.Injector
     *
     * @constructor
     *
     * @exports Injector as O.Injector
     */

	var Injector = O.Class.create('O.Injector', function Injector() {
		this.dependencies = {};
	});

	Injector.prototype.register = function(name, instance){
		O.Logger.log("Added to Injector - "+name+" - "+ instance);
		this.dependencies[name] = instance;
	}

	Injector.prototype.getDependencies = function(arr){
		var self = this;
		return arr.map(function(value) {
			return self.dependencies[value];
		}); 
	}

	O.Injector = new Injector;

})();