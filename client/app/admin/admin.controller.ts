'use strict';

(function() {

class AdminController {
  constructor(User,$http, $scope, socket, $document) {

    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];

    // Use the User $resource to fetch all users
    this.users = User.query();
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
    this.$http.get('/api/things').then(response => {
      
      this.awesomeThings = response.data;
      this.socket.syncUpdates('thing', this.awesomeThings);
      console.log( this.awesomeThings);
    });
  }


  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

angular.module('folioApp.admin')
  .controller('AdminController', AdminController);

})();
