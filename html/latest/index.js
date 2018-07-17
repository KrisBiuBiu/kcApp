apiready = function() {
  appAPI('http://192.168.11.111:9000', 'GET', {})
  .then(function(data) {
    debug(data);
  })
  .catch(function(data) {
    debug(data);
  })

}
