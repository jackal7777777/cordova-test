var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    var module = ons.bootstrap('myApp', ['onsen','newsLoader']);
    module.controller('AppController', function($scope) {
      console.log("onsen is ready");
    });
    module.controller('NewsController', function($scope, nana) {
      nana.get_news($scope);      
    });
    module.controller('DiscoController', function($scope) {});
    module.controller('BlogController', function($scope) {});
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
  }
};

//ネットワーク接続種別確認関数
function checkConnection() {
  var networkState = navigator.connection.type;

  var states = {};
  states[Connection.UNKNOWN]  = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI]     = 'WiFi connection';
  states[Connection.CELL_2G]  = 'Cell 2G connection';
  states[Connection.CELL_3G]  = 'Cell 3G connection';
  states[Connection.CELL_4G]  = 'Cell 4G connection';
  states[Connection.CELL]     = 'Cell generic connection';
  states[Connection.NONE]     = 'No network connection';

  //alert('Connection type: ' + states[networkState]);
}

angular.module('newsLoader',[]).service('nana', ['$http', function ($http) {
  this.get_news = function(scope){
    scope.items = "ok";
    console.log(scope);

    //var get_url = "http://www.mizukinana.jp/";
    var get_url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20%3D%20'http%3A%2F%2Fwww.mizukinana.jp%2Fnews%2Findex.html'%20and%20xpath%20%3D%20'%2F%2Fh3'%3B&diagnostics=true";

    return $http.get(get_url).success(function(response){
      //console.log(response.query.results);
      var latests = response;

      scope.items = latests;

      console.log(latests);

      //console.log(latests.getElementsByTagName('h3')[0]);

      
      var dom_parser = new DOMParser();
      var document_obj = null;
      
      // XML 文字列から Document オブジェクトを作成する
      document_obj = dom_parser.parseFromString(latests , "application/xml");
      //console.log("document_obj:"+document_obj);

      var doc = document_obj.documentElement;
      console.log(doc);
      var items = doc.getElementsByTagName('h3');
      var item_val;
      var item_text = [];//ニュースリスト文字列格納用変数
      var current_text = "";

      for(var i =0; i<items.length; i++){//タグ全て
        item_val = items[i].childNodes;
        item_text[i] = "";//初期化
        for(var j=0; j<item_val.length; j++){//タグ内のノード全て
          var current_text = item_val[j].nodeValue;//ノード内の文字列取得
          if(current_text){//nullなら取得しない
            //特殊文字を排除して取得
            item_text[i] += current_text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
            console.log("add:"+current_text);
          }
        }
      }

      //リストに追加
      scope.items = item_text;
      //リストを表示
      //document.getElementById("message").setAttribute("display", "none");
      document.getElementsByClassName("message").setAttribute("display", "none");
      //document.getElementById("unloded").setAttribute("display", "block");
      document.getElementsByClassName("message").setAttribute("display", "none");


    }).error(function(data, status) {
      console.log(status);
    });


    //return alert("ok");
  };  
}]);

app.initialize();