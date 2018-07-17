apiready = function () {
    // $api.fixStatusBar( $api.dom('header') );
    api.setStatusBarStyle({
        style: 'dark',
        color: '#6ab494'
    });
    funIniGroup();
}

function funIniGroup(){
    var eHeaderLis = $api.domAll('footer div i');
    // var eHeaderLis = $api.domAll('header li'),
    var frames = [];
    var eHeaderLisLength = eHeaderLis.length;

    for (var i = 0; i < eHeaderLisLength; i++) {
        frames.push( {
            name: 'frame'+i,
            url: './html/frame'+i+'.html',
            bgColor : 'rgba(0,0,0,.2)',
            bounces:true
        } );
    }
    // frames[0].url = 'https://www.kechuang.org'
    frames[0] = {
      name: '最新文章',
      url: './latest/index.html',
      bgColor: '#f6f6f6',
      bounces: true
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
