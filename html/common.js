function appAPI(url, method, data) {
  return new Promise(function(resolve, reject) {
    var obj = {
        url: url,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'FROM': 'nkcAPI'
        }
    };
    if(data) obj.data = data;
    api.ajax(obj, function(ret, err){
        if (err) {
            reject(err);
        } else {
            resolve(ret);
        }
    });
  });
}

function debug(data) {
  var body = document.getElementsByTagName('body')[0];
  body.innerHTML += JSON.stringify(data);
}
