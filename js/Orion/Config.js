(function() {
	'use strict';

	var Config = O.Class.create('O.Config', function Config() {
		this.version = "0.0.1";
		this.engine = "2d";
	});

	Config.prototype.set = function(obj) {
		O.Utils.extend({}, this, obj)
	};


	O.Config = new Config;

})();