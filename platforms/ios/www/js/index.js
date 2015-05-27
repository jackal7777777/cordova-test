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
    module.controller('AppController', function($scope) {
      console.log("onsen is ready");
    });
    module.controller('NewsController', function($scope, $http) {
      ons.ready(function() {
        
        $scope.networkTest = checkConnection();
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

app.initialize();