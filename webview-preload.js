(function() {
	var ipc = require('ipc');
	
	var listeners = {};
	
	window.API = {
		on: function(event, fn) {
			if(!listeners[event]) listeners[event] = [];
			listeners[event].push(fn);
		},
		send: function() {
			var args = Array.prototype.slice.call(arguments, 0);
			
			ipc.sendToHost.apply(ipc, ['event'].concat(args));
		},
	}
	
	ipc.on('event', function(event) {
		if(!listeners[event]) return;
		
		var args = Array.prototype.slice.call(arguments, 1);
		
		for(var i = 0; i < listeners[event].length; i++) {
			listeners[event][i].apply(window.API, args);
		}
	});
})();
