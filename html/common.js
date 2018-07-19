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
    if(['get', 'GET', 'delete', 'DELETE'].indexOf(method)) {
      obj.url += '?';
      for(var key in data) {
        obj.url += key + '=' + data[key] + '&'
      }
    }
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
  body.innerHTML += '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
}

function openThread(tid, pid) {
    alert(tid + '-' + pid);
}

function openUser(uid) {
    alert(uid);
}

function extendThreads(threads) {
    var host = api.getPrefs({
        sync: true,
        key: 'host'
    });
    for(var i = 0; i < threads.length; i++) {
        threads[i].imgSrc = threads[i].hasCover? host + '/cover/' + threads[i].tid: '';
        threads[i].onclick = 'openThread("'+ threads[i].tid +'")';
        threads[i].lastOnclick = 'openThread("'+ threads[i].tid +'", "'+threads[i].lastPost.pid+'")';
        threads[i].user = threads[i].firstPost.user;
        threads[i].lastUser = threads[i].lastPost.user;
        threads[i].user.avatarSrc = host + '/avatar/' + threads[i].uid;
        threads[i].user.onclick = 'openUser("'+threads[i].uid+'")';
        threads[i].lastUser.onclick = 'openUser("'+threads[i].lastPost.uid+'")';
        threads[i].imgStyle = threads[i].hasCover?'': 'display: none;';
        threads[i].titleStyle = threads[i].digest?'color: #d48900;': '';
        threads[i].toc = moment(threads[i].toc).fromNow();
        threads[i].lastToc = moment(threads[i].lastPost.toc).fromNow();
    }
    return threads;
}

function extendAds(ads) {
    var host = api.getPrefs({
        sync: true,
        key: 'host'
    });
    for(var i = 0; i < ads.length; i++) {
      ads[i].src = host + '/cover/' + ads[i].tid;
      ads[i].onclick = 'openThread("'+ ads[i].tid +'")';
    }
    return ads;
}

function showLoading() {
  var loading = document.getElementById('loading');
  if(loading) return;
  var body = document.getElementsByTagName('body')[0];
  var loading = document.createElement('div');
  loading.id = 'loading';
  var span = document.createElement('span');
  span.innerHTML = '加载中';
  var img = document.createElement('img');
  img.src = '../../image/loading_more.gif';
  loading.appendChild(span);
  loading.appendChild(img);
  body.appendChild(loading);
}

function hideLoading() {
  var body = document.getElementsByTagName('body')[0];
  var loading = document.getElementById('loading');
  if(loading){
    body.removeChild(loading);
  }
}

function print(a, type) {
  if(type === 'obj') {
    console.log('-------------1-----------');
    for(const key in a) {
      console.log(key + ': ' + a[key]);
    }
    console.log('-------------2------------');
  } else if(type === 'arr') {
    console.log('-------------1-----------');
    console.log('[' + a.join(',') + ']');
    console.log('-------------2------------');
  } else {
    console.log('-------------1-----------');
    console.log(a);
    console.log('-------------2------------');
  }
}

// 通过name向vue中添加组件
var initVueTmpByName = function(name, props) {
  var path = 'widget://html/templates/' + name + '.html';
  var html = api.readFile({
    sync: true,
    path: path
  });
  var vueObj = {
    template: html
  };
  if(props) {
    vueObj.props = props;
  }
  Vue.component(name, vueObj);
}

function $kcApp(callback) {
  // 初始化api
  apiready = function() {
    // 初始化moment语言
    moment.locale('zh-cn');

    // 初始化vue组件
    initVueTmpByName('loading');
    initVueTmpByName('ads', ['ads']);
    initVueTmpByName('thread-list', ['threads']);

    callback();
  }
}
