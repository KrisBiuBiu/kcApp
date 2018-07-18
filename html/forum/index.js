var firstMajorFids; // 获取所有专业fid
var firstMajorNames; // 获取所有一级专业名称


// 进入二级专业，打开新的window
function fnChangeSecondMajorHeader(){
  api.openWin({
      name: 'secondMajor_header',
      url: './secondMajor_header.html',
      pageParam: {
          name: 'test'
      }
  });
}

// 打开二级列表详情页
function fnOpenSecondMajorList(){
  var secondMajorHeight = $api.dom("body").offsetHeight - $api.dom("header").offsetHeight;
  api.openFrame({
      name: 'secondMajorList',
      url: './secondMajor.html',
      rect: {
          x: 0,
          y: $api.dom("header").offsetHeight,
          w: api.winWidth,
          h:secondMajorHeight
      },
      // pageParam: {
      //     name: 'test'
      // },
      bounces: true,
      bgColor: 'rgba(0,0,0,0)',
      vScrollBarEnabled: true,
      hScrollBarEnabled: true
  });
}
