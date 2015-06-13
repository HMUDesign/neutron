var neutron = require('neutron')(__dirname);

neutron.on('ready', function() {
	var main = neutron.open('main', 'index.html', {
		width: 960,
		height: 540,
//		kiosk: true,
		devtools: true,
	});
	
	main.setMenu(null);
	
	setTimeout(function() {
		neutron.send('main', 'ping');
	}, 1000);
});
