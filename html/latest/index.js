moment.locale('zh-cn');
apiready = function() {
  var host = api.getPrefs({
      sync: true,
      key: 'host'
  });
  appAPI(host + '', 'GET', {})
  .then(function(data) {
    var ads = data.ads;
    var threads = data.threads;
    for(var i = 0; i < threads.length; i++) {
        threads[i].imgSrc = host + '/cover/' + threads[i].tid;
        threads[i].onclick = 'openThread("'+ threads[i].tid +'")';
        threads[i].user = threads[i].firstPost.user;
        threads[i].user.avatarSrc = host + '/avatar/' + threads[i].uid;
        threads[i].user.onclick = 'openUser("'+threads[i].uid+'")';
        threads[i].imgStyle = threads[i].hasCover?'': 'display: none;';
        threads[i].titleStyle = threads[i].digest?'color: #d48900;': '';
        threads[i].toc = moment(threads[i].toc).fromNow();
    }
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
    var appLatestThreads = new Vue({
        el: '#latest-threads',
        data: {
            threads: data.threads
        }
    });
  })
  .catch(function(data) {
    // debug(data);
  })
}
