var app = require('app');
var path = require('path');
var WindowManager = require('./lib/window-manager');

app.on('window-all-closed', function() {
	if (process.platform === 'darwin') return;
	
	app.quit();
});

module.exports = function(dirname) {
	return {
		on: app.on.bind(app),
		send: WindowManager.emit.bind(WindowManager),
		open: function(key, url, config) {
			url = 'file://' + path.join(dirname, url);
			return WindowManager.open(key, url, config);
		},
	};
}
