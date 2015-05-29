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
      ons.ready(function() {
        
        $scope.networkTest = checkConnection();
        nana.get_news();
        //console.log("onsen is ready");
      });
    });
    module.controller('PageController', function($scope) {});
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
    //console.log("device is ready");

    
    //checkConnection();
    /*var request = $http({
            method: "post",
            url: "http://www.mizukinana.jp/news/index.html",
            data: {
                type: 'latest'
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        request.json().success(function(data) {
          console.log(data);
        });*/
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

  alert('Connection type: ' + states[networkState]);
}

angular.module('newsLoader',[]).service('nana', ['$http', function ($http) {
  this.get_news = function(){
    return $http({method: "POST"})
    .jsonp("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20%3D%20'http%3A%2F%2Fwww.mizukinana.jp%2Fnews%2Findex.html'%20and%20xpath%20%3D%20'%2F%2Fh3'%3B&format=json&diagnostics=true").then(
      function (response) {
        return response.data;
    },
    function (response) {
        alert(response.data.message);
        //return {items: []};
    });
  };  
}]);

app.initialize();