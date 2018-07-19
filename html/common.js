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
        if (data) obj.data = data;
        api.ajax(obj, function(ret, err) {
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

function openThread(tid) {
    alert(tid);
}

function openUser(uid) {
    alert(uid);
}

// 返回键，需要将dom添加event-back的样式
function fnReadyKeyback() {
    var keybacks = $api.domAll('.event-back');
    for (var i = 0; i < keybacks.length; i++) {
        $api.attr(keybacks[i], 'tapmode', 'highlight');
        keybacks[i].onclick = function() {
            api.closeWin();
        };
    }
    api.parseTapmode();
};

// 根据位置索引改变一组dom的样式active
// index:位置索引
// doms:被操作的全部dom
// activeCls:active的样式
function fnChangeActive(index, doms, activeCls){
  for(var i=0;i < doms.length;i++){
    if(i === index){
      $api.addCls(doms[i], activeCls);
    }else{
      $api.removeCls(doms[i], activeCls);
    }
  }
}
