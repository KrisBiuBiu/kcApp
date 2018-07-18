apiready = function() {
  var host = api.getPrefs({
      sync: true,
      key: 'host'
  });
  appAPI(host + '', 'GET', {})
  .then(function(data) {
    var ads = data.ads;
    for(var i = 0; i < ads.length; i++) {
      ads[i].src = host + '/cover/' + ads[i].tid;
      ads[i].onclick = 'openThread("'+ ads[i].tid +'")';
    }
    var app = new Vue({
      el: '#aui-slide',
      data: {
        ads: data.ads
      }
    })
    var slide = new auiSlide({
        container:document.getElementById("aui-slide"),
        // "width":300,
        "height":(api.winWidth*3)/4,
        "speed":500,
        "autoPlay": 4000, //自动播放
        "loop":true,
        "pageShow":true,
        "pageStyle":'dot',
        'dotPosition':'center'
    });
  })
  .catch(function(data) {
    // debug(data);
  })
}
