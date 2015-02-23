(function() {
    'use strict';
    /**
     * Logger Class
     *
     * @class
     * @name O.Logger
     *
     * @constructor
     *
     * @exports Logger as O.Logger
     */

	var Logger = O.Class.create('O.Logger', function Logger() {
        this.init();
    });

    Logger.prototype.init = function(){
        //this.is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
        this.is_chrome = false;
    }

	Logger.prototype.error = function(msg){
        if(this.is_chrome) console.log("%c Log: "+msg+" ", 'background: #222; color: rgb(255, 0, 0)');
        else console.error("Log:", msg);
	}

	Logger.prototype.warning = function (msg) {
        if(this.is_chrome) console.log("%c Log: "+msg+" ", 'background: #222; color: rgb(247, 175, 44)');
        else console.warning("Log:", msg);
	}

	Logger.prototype.log = function (msg) {
        if(this.is_chrome) console.log("%c Log: "+msg+" ", 'background: #222; color: #bada55');
        else console.log("Log:", msg);
	}

	O.Logger = new Logger;
})();