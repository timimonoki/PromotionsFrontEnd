'use strict';
angular.module('jumboClient').service('PaginationService', ['$http', '$q', function($http, $q){

    this.getAllShopsFromServer = function(pageNumber, size){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'http://localhost:8093/lidl/findShops'
        }).then(function successCallback(response){
            deferred.resolve(response);
        },
            function errorCallback(error){}
        );
        return deferred.promise;
    }

}]);
