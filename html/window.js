apiready = function () {
    // $api.fixStatusBar( $api.dom('header') );
    api.setPrefs({
      key: 'host',
      // value: 'https://www.kechuang.org'
      value: 'http://192.168.11.111:9000'
    })
    api.setStatusBarStyle({
        style: 'light',
        color: '#03a9f4'
    });
    funIniGroup();
}

function funIniGroup(){
    var eHeaderLis = $api.domAll('footer div i');
    // var eHeaderLis = $api.domAll('header li'),
    var frameWinFootNames = ['lastest','forum','message','me']
    var frameWinFootHtmls = ['./lastest/index.html','./forum/index.html','./message/index.html','./me/index.html'];
    var frames = [];
    var eHeaderLisLength = eHeaderLis.length;

    for (var i = 0; i < eHeaderLisLength; i++) {
        frames.push( {
            name: frameWinFootNames[i],
            url: frameWinFootHtmls[i],
            bgColor : 'rgba(0,0,0,.2)',
            bounces:true
        } );
    }
    // frames[0].url = 'https://www.kechuang.org'
    frames[0] = {
      name: '最新文章',
      url: './latest/index.html',
      bgColor: '#ffffff',
      bounces: true,
    };
    var mainFrameHeight = $api.dom('body').offsetHeight-$api.dom('footer').offsetHeight-$api.dom("header").offsetHeight
    api.openFrameGroup({
        name: 'group',
        scrollEnabled: false,
        rect: {
            x: 0,
            y: $api.dom('header').offsetHeight,
            w: api.winWidth,
            h: mainFrameHeight
        },
        index: 0,
        frames: frames
    }, function (ret, err) {

    });
}

// 随意切换按钮
function randomSwitchBtn( tag ) {
    if( tag == $api.dom('footer div.aui-active') )return;
    var eFootLis = $api.domAll('footer div.aui-bar-tab-item'),
        index = 0;
    for (var i = 0,len = eFootLis.length; i < len; i++) {
        if( tag == eFootLis[i] ){
            index = i;
        }else{
            $api.removeCls(eFootLis[i], 'aui-active');
        }
    }
    $api.addCls( eFootLis[index], 'aui-active');
    api.setFrameGroupIndex({
        name: 'group',
        index: index
    });
}

// 侧滑按钮
function fnDrawerLayout(){

}
