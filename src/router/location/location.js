// This Location class is a direct replacement for the Location in the Angular 2 Router
// This version accepts the angular $location services as a dependency
function Location($location, $rootScope){
  var onNextHandlers = [];

  this.subscribe = function (onNext, onThrow, onReturn) {
    onNextHandlers.push(onNext);
    return {
      dispose: function() {
        var index = onNextHandlers.indexOf(onNext);
        onNextHandlers.splice(index, 1);
      }
    };
  };

  this.path = function () {
    return $location.url();
  };

  this.go = function (path, query) {
    return $location.url(path + query);
  };

  $rootScope.$watch(function () { return $location.url(); }, function (url) {
    onNextHandlers.forEach(function(handler) { handler({'url': url }); });
  });
}

exports.Location = Location;