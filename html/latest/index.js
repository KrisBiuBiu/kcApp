apiready = function() {
  appAPI('http://192.168.11.111:9000', 'GET', {})
  .then(function(data) {
    debug(data);
  })
  .catch(function(data) {
    debug(data);
  })
  var slide = new auiSlide({
        container:document.getElementById("aui-slide"),
        // "width":300,
        "height":260,
        "speed":300,
        "pageShow":true,
        "pageStyle":'dot',
        "loop":true,
        'dotPosition':'center',
        currentPage:currentFun
    })

    function currentFun(index) {
        // console.log(index);
    }
    var slide2 = new auiSlide({
        container:document.getElementById("aui-slide2"),
        // "width":300,
        "height":240,
        "speed":300,
        "autoPlay": 0, //自动播放
        "pageShow":true,
        "loop":true,
        "pageStyle":'dot',
        'dotPosition':'center'
    })
    var slide3 = new auiSlide({
        container:document.getElementById("aui-slide3"),
        // "width":300,
        "height":240,
        "speed":500,
        "autoPlay": 3000, //自动播放
        "loop":true,
        "pageShow":true,
        "pageStyle":'line',
        'dotPosition':'center'
    })
    // console.log(slide3.pageCount());
}
