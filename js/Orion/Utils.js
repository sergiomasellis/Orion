(function() {

	var Utils = O.Class.create('O.Utils', function Utils() {});

	Utils.prototype.extend = function(out) {
		out = out || {};
		for (var i = 1; i < arguments.length; i++) {
    		var obj = arguments[i];

			if (!obj)
				continue;

			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					if (typeof obj[key] === 'object')
						this.extend(out[key], obj[key]);
					else
						out[key] = obj[key];
					}
			}
		}

  		return out;
	};

    Utils.prototype.generateUUID = function() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };

	Utils.prototype.requestAnimationFrame = function() {
		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
		                          window.mozRequestAnimationFrame ||
		                          window.msRequestAnimationFrame ||
		                          window.oRequestAnimationFrame ||
		                          function (callback) {
		                            return window.setTimeout(callback, 17 /*~ 1000/60*/);
		                          });
		}
	};

	Utils.prototype.cancelAnimationFrame = function() {
		if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
		                         window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
		                         window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
		                         window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
		                         window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
		                         window.clearTimeout);
		}
	};

	/**
	 * Keeps track of the current mouse position, relative to an element.
	 * @param {HTMLElement} element
	 * @return {object} Contains properties: x, y, event
	 */
	Utils.prototype.captureMouse = function(element) {
		var mouse = {x: 0, y: 0, event: null},
			body_scrollLeft = document.body.scrollLeft,
			element_scrollLeft = document.documentElement.scrollLeft,
			body_scrollTop = document.body.scrollTop,
			element_scrollTop = document.documentElement.scrollTop,
			offsetLeft = element.offsetLeft,
			offsetTop = element.offsetTop;

		element.addEventListener('mousemove', function (event) {
		var x, y;

		if (event.pageX || event.pageY) {
			x = event.pageX;
			y = event.pageY;
		} else {
			x = event.clientX + body_scrollLeft + element_scrollLeft;
			y = event.clientY + body_scrollTop + element_scrollTop;
		}
		x -= offsetLeft;
		y -= offsetTop;

		mouse.x = x;
		mouse.y = y;
		mouse.event = event;
		}, false);

		return mouse;
	};

	/**
	 * Keeps track of the current (first) touch position, relative to an element.
	 * @param {HTMLElement} element
	 * @return {object} Contains properties: x, y, isPressed, event
	 */
	Utils.prototype.captureTouch = function() {
		var touch = {x: null, y: null, isPressed: false, event: null},
		      body_scrollLeft = document.body.scrollLeft,
		      element_scrollLeft = document.documentElement.scrollLeft,
		      body_scrollTop = document.body.scrollTop,
		      element_scrollTop = document.documentElement.scrollTop,
		      offsetLeft = element.offsetLeft,
		      offsetTop = element.offsetTop;

		  element.addEventListener('touchstart', function (event) {
		    touch.isPressed = true;
		    touch.event = event;
		  }, false);

		  element.addEventListener('touchend', function (event) {
		    touch.isPressed = false;
		    touch.x = null;
		    touch.y = null;
		    touch.event = event;
		  }, false);
		  
		  element.addEventListener('touchmove', function (event) {
		    var x, y,
		        touch_event = event.touches[0]; //first touch
		    
		    if (touch_event.pageX || touch_event.pageY) {
		      x = touch_event.pageX;
		      y = touch_event.pageY;
		    } else {
		      x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
		      y = touch_event.clientY + body_scrollTop + element_scrollTop;
		    }
		    x -= offsetLeft;
		    y -= offsetTop;
		    
		    touch.x = x;
		    touch.y = y;
		    touch.event = event;
		  }, false);
		  
		  return touch;
	};

	/**
	 * Returns a color in the format: '#RRGGBB', or as a hex number if specified.
	 * @param {number|string} color
	 * @param {boolean=}      toNumber=false  Return color as a hex number.
	 * @return {string|number}
	 */
	Utils.prototype.parseColor = function (color, toNumber) {
	  if (toNumber === true) {
	    if (typeof color === 'number') {
	      return (color | 0); //chop off decimal
	    }
	    if (typeof color === 'string' && color[0] === '#') {
	      color = color.slice(1);
	    }
	    return window.parseInt(color, 16);
	  } else {
	    if (typeof color === 'number') {
	      color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
	    }
	    return color;
	  }
	};

	O.Utils = new Utils;
})();