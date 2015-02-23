(function() {
    'use strict';
    /**
     * Config Class
     *
     * @class
     * @name O.Config
     *
     * @constructor
     *
     * @exports Config as O.Config
     */
	var Config = O.Class.create('O.Config', function Config() {
		this.version = "0.0.1";
		this.engine = "2d";
	});

    /**
     * Overwrites default engine configs
     * @param obj
     */
	Config.prototype.setConfig = function(obj) {
		O.Utils.extend({}, this, obj)
	};


	O.Config = new Config;

})();