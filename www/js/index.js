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
    var module = ons.bootstrap('myApp', ['onsen']);
    module.controller('AppController', function($scope) { });
    module.controller('PageController', function($scope, $http) {
      ons.ready(function() {
        //pageNavigation();
        console.log("onsen is ready.");
        //newsLoad();

        /*
        $http.post("lib/file_get/file_get.php")
        .success(function(data) {
          console.log(data);
        })
        .error(function(data) {
          console.log(data);
        });
        */


        var request = $http({
            method: "post",
            url: "http://www.mizukinana.jp/news/index.html",
            data: {
                type: 'latest'
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        request.json(url).success(function(data) {
          console.log(data);
        });

        //var domContent = angular.element("#news_area");
      });
    });
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

//navigations
function pageNavigation(){
  //push
  var push = document.getElementById('push');
  push.addEventListener('click', function(){
    myNavigator.pushPage('blog.html', { animation : 'slide' },function(){
      //pop
      var pop = document.getElementById('pop');
      pop.addEventListener('click', function(){
        myNavigator.popPage();
      }, false);
    });
  }, false);
}

function newsLoad(){
  var myApp = angular.module("myApp", []);
  console.log("call");
 
  myApp.run(function($http) {
    onsole.log("incall");
    $http.get("../lib/file_get/file_get.php")
    .success(function(data) {
      console.log(data);
    })
    .error(function(err) {
      console.log(err);
    });
  });
}

app.initialize();