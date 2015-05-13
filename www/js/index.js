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
    ons.bootstrap();
    ons.ready(function(){
      console.log("onsen is ready.");
      //pageNavigation();
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
    /*var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);*/
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

app.initialize();