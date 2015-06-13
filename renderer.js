var ipc = require('ipc');

var listeners = {};

var Processes = module.exports = {
	on: function(event, fn) {
		if(!listeners[event]) listeners[event] = [];
		listeners[event].push(fn);
	},
	send: function(key) {
		var args = Array.prototype.slice.call(arguments, 0);
		
		ipc.send.apply(ipc, ['event'].concat(args));
	},
};

ipc.on('event', function(event) {
	if(!listeners[event]) return;
	
	var args = Array.prototype.slice.call(arguments, 1);
	
	for(var i = 0; i < listeners[event].length; i++) {
		listeners[event][i].apply(Processes, args);
	}
});
