var firstMajorFids; // 获取所有专业fid
var firstMajorNames; // 获取所有一级专业名称


// 进入二级专业，打开新的window，设置header
function fnChangeSecondMajorHeader(){
  api.openWin({
      name: 'secondMajor_header',
      url: './secondMajor_header.html',
      pageParam: {
          name: 'test'
      }
  });
}

// 打开二级列表页，frame
function fnOpenSecondMajorList(){
  var headerHeight = $api.dom("header").offsetHeight + $api.dom(".aui-tab").offsetHeight;
  var secondMajorHeight = $api.dom("body").offsetHeight - headerHeight;
  api.openFrame({
      name: 'secondMajorList',
      url: './secondMajor.html',
      rect: {
          x: 0,
          y: headerHeight,
          w: api.winWidth,
          h: secondMajorHeight
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

// 点击关注
function clickFollow(){
  alert("adsadasd")
}

// 打开专业详情页面 window header
function fnOpenMajorInfoHeader(){
  api.openWin({
      name: 'secondMajorInfo_header',
      url: './secondMajorInfo_header.html',
      pageParam: {
          name: 'test1'
      }
  });
}

// 查看专业详情，frame
function fnOpenMajorInfoFrame(){
  var secondMajorHeight = $api.dom("body").offsetHeight - $api.dom("header").offsetHeight;
  api.openFrame({
      name: 'secondMajorInfo',
      url: './secondMajorInfo.html',
      rect: {
          x: 0,
          y: headerHeight,
          w: api.winWidth,
          h: secondMajorHeight
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
