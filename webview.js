module.exports = function(element) {
	var listeners = {};
	
	var webview = {
		element: element,
		
		on: function(event, fn) {
			if(!listeners[event]) listeners[event] = [];
			listeners[event].push(fn);
		},
		send: function() {
			var args = Array.prototype.slice.call(arguments, 0);
			
			element.send.apply(element, ['event'].concat(args));
		},
	};
	
	var emit = function(event) {
		if(!listeners[event]) return;
		
		var args = Array.prototype.slice.call(arguments, 1);
		
		for(var i = 0; i < listeners[event].length; i++) {
			listeners[event][i].apply(webview, ['event'].concat(args));
		}
	}
	
	element.addEventListener('ipc-message', function(event) {
		emit.apply(webview, event.args);
	});
	
	element.addEventListener('dom-ready', function() {
		emit('dom-ready');
	});
	
	return webview;
}
