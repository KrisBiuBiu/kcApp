var paging = {
  page: -1
}; // 分页
var host; // 域名
var app; // vue实列
var slide; // 轮播
var toast; // 提示窗
$kcApp(function() {
  
  // 新建toast实列
  api.parseTapmode();
  toast = new auiToast({});


  // 新建vue实列
  app = new Vue({
    el: '#app',
    data: {
      show: false,
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
      app.show = true;
    } catch(err) {}
  }
  // 获取第一次数据
  toast.loading({
    title:"加载中"
  })
  loadLatestData(function(err, data) {
    if(err) {

    } else {
      toast.hide();
    }
  });

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
  })
  .catch(function(data) {
    toast.fail({
      title: '加载失败',
      duration: 4000
    });
  })
}

function loadLatestData(callback) {
  paging.page = -1;
  appAPI(host, 'GET', {page: paging.page+1})
  .then(function(data) {
    data.threads = extendThreads(data.threads);
    data.ads = extendAds(data.ads);
    app.threads = data.threads;
    app.ads = data.ads;
    if(!app.show) app.show = true;
    paging = data.paging;
    api.writeFile({
        path: 'fs://latest.txt',
        data: JSON.stringify(data)
    }, function(ret, err){});
    if(callback) callback(undefined, data);
  })
  .catch(function(data) {
    toast.fail({
      title: '加载失败',
      duration: 4000
    });
    if(callback) callback(data);
  });
}
