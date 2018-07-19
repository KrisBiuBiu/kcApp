var paging = {
  page: -1
}; // 分页
var host; // 域名
var app; // vue实列
var slide;
$kcApp(function() {

  // 新建vue实列
  app = new Vue({
    el: '#app',
    data: {
      threads: [],
      ads: []
    },
    updated: function() {
      // 滑动到底部获取数据
      api.addEventListener({
        name:'scrolltobottom',
        extra:{
         threshold:100         //设置距离底部多少距离时触发，默认值为0，数字类型
        }
      }, function(ret, err){
        api.removeEventListener({
            name: 'scrolltobottom'
        });
        addThreads(paging.page);
      });
      // 轮播图配置
      if(!slide) {
        slide = new auiSlide({
          container:document.getElementById("aui-slide"),
          // "width":300,
          "height":(api.winWidth*3)/4,
          "speed":500, //速度
          "autoPlay": 4000, //自动播放
          "loop":true,
          "pageShow":true,
          "pageStyle":'dot',
          'dotPosition':'center'
        });
      }
    }
  });

  // 从偏好设置中取出域名
  host = api.getPrefs({
    sync: true,
    key: 'host'
  });

  // 取出上一次的浏览数据
  var data = api.readFile({
    sync: true,
    path: 'fs://aaa.txt'
  });
  // 判断数据是否可用
  if(data) {
    try{
      data = JSON.parse(data);
      app.threads = data.threads;
      app.ads = data.ads;
    } catch(err) {}
  }
  // 获取第一次数据
  loadLatestData();

  //下拉刷新
  api.setRefreshHeaderInfo({
    // loadingImg: '../images/1.gif',
    bgColor: '#ffffff',
    textColor: '#aaaaaa',
    textDown: '下拉刷新',
    textUp: '松开刷新',
    textLoading: '刷新中...',
    showTime: false
  }, function(ret, err) {
      loadLatestData(function() {
        api.refreshHeaderLoadDone();
      });
  });

});

function addThreads(page, callback) {
  appAPI(host, 'GET', {page: page+1})
  .then(function(data) {
    data.threads = extendThreads(data.threads);
    app.threads = app.threads.concat(data.threads);
  });
}

function loadLatestData(callback) {
  paging.page = -1;
  appAPI(host, 'GET', {page: paging.page+1})
  .then(function(data) {
    data.threads = extendThreads(data.threads);
    data.ads = extendAds(data.ads);
    app.threads = data.threads;
    app.ads = data.ads;
    paging = data.paging;
    api.writeFile({
        path: 'fs://latest.txt',
        data: JSON.stringify(data)
    }, function(ret, err){});
    if(callback) callback();
  })
}

/*
moment.locale('zh-cn');
var paging;
$kcApp(function() {
  // initVueTmp();
  var host = api.getPrefs({
      sync: true,
      key: 'host'
  });
  var data, threadsApp, adsApp, slide;
  api.writeFile({
      path: 'fs://latest.txt',
      data: ''
  }, function(ret, err){
      if(ret.status){

      }else{

      }
  });

  api.readFile({
    path: 'fs://latest.txt'
  }, function(ret, err){
    if( ret && ret.data !== ''){
      try{
        data = JSON.parse(ret.data);
        threadsApp = new Vue({
            el: '#latest-threads',
            data: {
              threads: data.threads
            }
        });
        adsApp = new Vue({
            el: '#aui-slide',
            data: {
              ads: data.ads
            }
        });
        slide = new auiSlide({
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
      } catch(err) {
        api.writeFile({
          path: 'fs://latest.txt',
          data: ''
        }, function(ret, err){
          if(ret.status){

          }else{

          }
        });
      }
    }
    appAPI(host + '', 'GET', {})
    .then(function(data) {
      api.addEventListener({
        name:'scrolltobottom',
        extra:{
         threshold:100         //设置距离底部多少距离时触发，默认值为0，数字类型
        }
      }, function(ret, err){
        // showLoading();
        appAPI(host+'?page='+(paging.page+1), 'GET', {})
        .then(function(data) {
          paging = data.paging;
          var threads = extendThreads(data.threads);
          threadsApp.threads = threadsApp.threads.concat(threads);
          // hideLoading();
        })
        .catch(function() {
          // hideLoading();
          alert('加载出错');
        })
      })
      paging = data.paging;
      data.threads = extendThreads(data.threads);
      data.ads = extendAds(data.ads);
      if(!threadsApp) {
        print(data.threads, 'obj');

        threadsApp = new Vue({
            el: '#latest-threads',
            data: {
              threads: data.threads
            }
        });
      } else {
        threadsApp.threads = data.threads;
      }
      if(!adsApp) {
        adsApp = new Vue({
            el: '#aui-slide',
            data: {
              ads: data.ads
            }
        });
      } else {
        adsApp.ads = data.ads;
      }
      if(!slide) {
        slide = new auiSlide({
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
      }

      api.writeFile({
          path: 'fs://latest.txt',
          data: JSON.stringify(data)
      }, function(ret, err){
          if(ret.status){

          }else{

          }
      });

    })
    .catch(function(data) {
      // debug(data);
    })
  });
  api.setRefreshHeaderInfo({
    loadingImg: '../images/1.gif',
    bgColor: '#ccc',
    textColor: '#fff',
    textDown: '下拉刷新...',
    textUp: '松开刷新...',
    textLoading: '刷新中...',
    showTime: false
}, function(ret, err) {
    //在这里从服务器加载数据，加载完成后调用api.refreshHeaderLoadDone()方法恢复组件到默认状态
    setTimeout(function() {
      api.refreshHeaderLoadDone();
    }, 2000)
});

})
*/
