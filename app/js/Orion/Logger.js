class Logger {
	constructor(){
	    // var original = window.console
	    // function handle(method, args){
	    //     var message = Array.prototype.slice.apply(args).join(' ')
	    //     message = "%c"+message.split(":")[0]+"%c"+message.split(":")[1];

	    //     // console.log("%c", "color: blue; font-size:15px;", "color: green; font-size:12px;"); 
	    //     // do sneaky stuff
	    //     if (original) {
	    //     	original[method](message, "margin: 20px; padding: 3px; color: black; background:#d2d2d2; font-size:15px;", "color: black; font-size:15px;");
	    //     }

	    // }
	    // window.console = {
	    //     log: function(){
	    //         handle('log', arguments)
	    //     }
	    //     , warn: function(){
	    //         handle('warn', arguments)
	    //     }
	    //     , error: function(){
	    //         handle('error', arguments)
	    //     }
	    // }
	}
}

export default new Logger;