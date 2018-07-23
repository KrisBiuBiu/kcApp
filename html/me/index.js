var user = {
    "username" : "SPARK",
    "description" : "这家伙一点也不懒，他认认真真写了一些东西。",
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
    "digestPostsCount" : 4,
    grade: {
      _id: 1,
      displayName: '千古风流',
      src: 'https://www.kechuang.org/default/v5l.png'
    }
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
      user: ''
    }
  });
});
