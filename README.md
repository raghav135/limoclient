# limoclient
The aim of this project is to create a javascript limoclient which can connect to a limoserver.

Sample Usage
```
var {LimoClient} = require('LimoClient');

var cfg = { ip: '127.0.0.1', port: 16839 };
var limoClient = new LimoClient(cfg);
limoClient.connect( (err) => {
	limoClient.transieve('something', function(err, data) {
		console.log('got data ', data);
		limoClient.disconnect();
	});
});
```
