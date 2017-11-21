var net = require('net');
var AsyncLock = require('async-lock');
var lock = new AsyncLock();

var instances = 0;
class LimoClient {
	constructor(cfg) {
		this._instance = 'LimoClient_' + ++instances;
		this._cfg = cfg;
		this._msgNum = 1;
		this._socket = new net.Socket();
		this._buffer = '';
		this._doneFn = null;
		this._socket.on('data', (data) => {
			// TODO - Find when the data is actually ended
			if (this._doneFn) {
				this._doneFn(''+data);
			}
		});
	}
	connect(done) {
		this._socket.connect(this._cfg.port, this._cfg.ip, (err) => {
				done();	
				});
	}
	disconnect() {
		this._socket.destroy();
	}
	transieve(data, done) {
		// Use lock to ensure that messages are sent one by one
		lock.acquire(this._instance, (done) => {
			console.log('writing data ' , data);
			this._socket.write(data);
			this._msgNum++;
			this._doneFn = done;
		}, (data) => {
			done(data);
		});
	}
};

exports.LimoClient = LimoClient;
