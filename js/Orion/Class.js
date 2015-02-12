var O = O || {};

O.Class = (function() {
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
		create: function(namespace, constructor) {
			var newClass = makeNameSpace(namespace, constructor);
			newClass = constructor;
			newClass.prototype.fullClassName = namespace;
			newClass.prototype.toString = function() {
				return namespace;
			}

			return newClass;
		},
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
