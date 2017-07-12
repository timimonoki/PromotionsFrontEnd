'use strict';
angular.module('jumboClient').service('GeoItem', ['Config', '$q', '$http', function(Config, $q, $http) {

	function GeoItem(title, lat, lon, createdBy){
		this.title = text;
		this.lat = lat;
		this.lon = lon; 
		this.createdBy = createdBy;
	}

	this.new = function(){
		return new task('', '', new Date(), '', '', null);
	}

	this.insert = function(item){
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: 'http://localhost:3000/item/',
			data: item
		}).then(function successCallback(response) {
			deferred.resolve(response.data.task);
		}, 
		function errorCallback(error) {
			console.log(error);
			deferred.reject(error);
		});
		return deferred.promise;
	}

	this.remove = function(id){
		console.log(id);
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: 'http://localhost:3000/item/'+id+'/delete'
		}).then(function successCallback(response) {
			deferred.resolve(response.data);
		}, 
		function errorCallback(error) {
			console.log(error);
			deferred.reject(error);
		});
		return deferred.promise;
	}


	this.selectAll = function(){
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'http://localhost:3000/items/'
		}).then(function successCallback(response) {
			deferred.resolve(response.data.items);
		}, 
		function errorCallback(error) {
			console.log(error);
			deferred.reject(error);
		});
		return deferred.promise;
	}

	this.getShopLocations = function(){
    	    var deferred = $q.defer();
    	    $http({
    	            method: 'GET',
    	            url: 'http://localhost:8093/lidl/location',
    	            headers: {'Content-Type':'application/json'}
    	        }).then(function successCallback(response){
    	                deferred.resolve(response);
    	            },
    	            function errorCallback(error){
    	                console.log("Error: ", error);
    	            }
    	        );
    	        return deferred.promise;
    	}

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