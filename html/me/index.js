var user = {
    "username" : "SPARK",
    "description" : "上周末出去玩，在一栋建筑废墟里发现一窝野鸽子，准确地说应该是珠颈斑鸠。大鸟怂得不行，看见我离得还十多米就吓跑了。等我玩完一圈转回来，发现大鸟仍然不知去向，遂决定将蛋带回家，看能不能人工孵出小鸽子。 这个是野鸽子窝，很、非常以及极其的简陋，要不是有俩蛋在里面，真看不出来是个鸟窝 发愁怎么带回来，突然想起书包里",
    "color" : "#dedede",
    "uid" : "74185",
    "usernameLowerCase" : "spark",
    "postSign" : "这是帖子签名",
    "certs" : [
        "mobile",
        "dev",
        "examinated",
        "moderator"
    ],
    "cart" : [],
    "lastVisitSelf" : new Date("2018-03-28T10:05:50.846Z"),
    "score" : 89.9641016151377,
    "digestThreadsCount" : 0,
    "toppedThreadsCount" : 0,
    "recCount" : 3,
    "threadCount" : 13,
    "postCount" : 84,
    "disabledThreadsCount" : 7,
    "disabledPostsCount" : 10,
    "tlv" : new Date("2018-03-28T10:05:50.846Z"),
    "xsf" : 0,
    "toc" : new Date("2018-03-28T10:05:50.846Z"),
    "kcb" : 63,
    "__v" : 461,
    "volumeA" : true,
    "volumeB" : true,
    "violationCount" : 0,
    "dailyLoginCount" : 5,
    "digestPostsCount" : 4
}

var host; // 域名

$kcApp(function() {

  host = api.getPrefs({
    sync: true,
    key: 'host'
  });

  user.src = host + '/avatar/' + user.uid;

  var app = new Vue({
    el: '#app',
    data: {
      user: user
    }
  });
});
