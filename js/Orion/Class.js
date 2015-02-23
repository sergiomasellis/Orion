var O = O || {};

/**
 * Base class
 *
 * @class
 * @name O.Class
 *
 */
O.Class = (function() {
    'use strict';

    /**
     * Creates namespace object path on demand, avoiding manual setup and maintenance.
     * @private
     * @param  {string}   namespace   Full namespace of the class to be created
     * @param  {Function} constructor Constructor method
     * @return {Function}             Constructor method
     */
	function makeNameSpace(namespace, constructor){
		var parts = namespace.split('.');
		var parent = window;

		//loop thorugh namespace parts
		var part;
		for (var i = 0; i < parts.length; i++) {
			part = parts[i];
			if (typeof parent[part] === 'undefined') {
				if(i === parts.length - 1 && typeof constructor === 'function' ){
					parent[part] = constructor;
				}else{
					parent[part] = {};
				}
			}
			parent = parent[part];
		};

		return parent;
	}

	return {

        /**
         * Creates new class on the right namespace.
         * @param  {string}   namespace   Full namespace of the class to be created
         * @param  {Function} constructor Constructor method
         * @return {Function}             Constructor method
         */
		create: function(namespace, constructor) {
			var newClass = makeNameSpace(namespace, constructor);
			newClass = constructor;
			newClass.prototype.fullClassName = namespace;
			newClass.prototype.toString = function() {
				return namespace;
			}

			return newClass;
		},

        /**
         * Extends already existing class. Make sure to import base class before children!
         * @param  {O.Class} parent      Parent class to be extended
         * @param  {string}    namespace   Full namespace of the child class to be created
         * @param  {Function}  constructor Constructor method
         * @return {Function}              Constructor method
         */
		extend: function(parent, namespace, constructor) {
			
			var F = function() {};
			try{
				F.prototype = parent.prototype;
			} catch (e){
				throw new Error('Parent class does not exist..');
			}

			constructor.prototype = new F();
			constructor.prototype.parent = parent;
			constructor.prototype.constructor = constructor;
			return O.Class.create(namespace, constructor);
		}
	}

})();
