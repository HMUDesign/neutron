var ipc = require('ipc');
var BrowserWindow = require('browser-window');

var WindowManager = module.exports = {};

var windows = {};

WindowManager.open = function(key, url, config) {
	if(!config.kiosk) {
		config.width += 18;
		config.height += 44;
	}
	
	var window = windows[key] = new BrowserWindow(config);
	window.loadUrl(url);
	
	if(config.kiosk) {
		window.setKiosk(true);
	}
	
	if(config.devtools) {
		window.openDevTools();
	}
	
	window.on('closed', function() {
		delete windows[key];
	});
	
	return window;
}

WindowManager.emit = function(key) {
	if(!windows[key]) {
		throw new Error('Unknown window: ' + JSON.stringify(key));
	}
	
	var args = Array.prototype.slice.call(arguments, 1);
	BrowserWindow.prototype.send.apply(windows[key], ['event'].concat(args));
}

ipc.on('event', function(event) {
	var args = Array.prototype.slice.call(arguments, 1);
	WindowManager.emit.apply(WindowManager, args);
});
