var {LimoClient} = require('../index');

var cfg = { ip: '127.0.0.1', port: 16839 };
var limoClient = new LimoClient(cfg);
limoClient.connect( (err) => {
  limoClient.transieve('something', function (data) {
    console.log('got data ', data);
  });
  limoClient.transieve('something', function (data) {
    console.log('got data2 ', data);
    limoClient.disconnect();
  });
});
