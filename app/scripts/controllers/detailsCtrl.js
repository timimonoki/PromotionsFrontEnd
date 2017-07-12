'use strict';
angular.module('jumboClient').controller('DetailsCtrl', ['$state', '$scope', '$stateParams', '$http', function ($state, $scope, $stateParams, $http) {


  $scope.items="AICI SUNT DETALII ID:"+$stateParams.id;

}]);
