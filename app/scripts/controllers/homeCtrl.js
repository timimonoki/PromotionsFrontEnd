'use strict';
angular.module('jumboClient').controller('HomeCtrl', ['uiGmapGoogleMapApi', 'User', 'GeoItem', '$state', '$scope', '$log', 'Notification',
  'ModalService', 'SweetAlert',
	function (uiGmapGoogleMapApi, User, GeoItem, $state, $scope, $log, Notification, ModalService, SweetAlert) {

/* A.UTH */
$scope.isLoggedIn = User.isLoggedIn;
User.get() == null ? console.log("User is not logged in") : console.log("User is logged in with the username: ", User.getUsername());

$scope.markers2 = [];
$scope.map = { center: { latitude: 	46.78439, longitude: 23.556620 }, zoom: 17};
$scope.map.infoWindow ={show:false, coords:null};

uiGmapGoogleMapApi.then(function(maps) {
  // at this point the map is loaded
});

/* MODAL FOR NEW ITEM */
$scope.show = function() {
     ModalService.showModal({
         templateUrl: '../views/hello/modal.html',
         controller: "NewItemController"
     }).then(function(modal) {
         modal.element.modal();
         modal.close.then(function(response) {
            if(typeof response ==='string' && response==='Cancel'){
                //this is cancel
              } else { //object -> save
                save(response);
              }
         });
     });
};

$scope.goToDetails = function(id){
  $state.transitionTo('main.details', {id: $scope.allShops[0].id});
}

/* ITEMS MANAGEMENT */

$scope.items = [];
$scope.item = {'title':'', 'lat':'', 'lon':'', 'createdBy':''};

$scope.remove =function(id){

    SweetAlert.swal({
        title: "Are you sure you want to delete this item?",
        text: "Your will not be able to recover it afterwards",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true},
    function(isConfirm){
        if (isConfirm) {
            GeoItem.remove(id).then(function(data){
                Notification.info('Item deleted');
                getItems();
            },
            function(error){
            SweetAlert.swal("Item could not be deleted", "", "warning")
        });
        }
    });
}


function getItems(){

    // I would most probably need an ajax call to the server to the endpoint which returns all the shops
    GeoItem.getShopLocations().then((itemsReturned) => {
        $scope.items = [{id: 123, title: 'Lidl', lat: '46.775577', lon: '24.701044', description:"Reghin, Str.Apalinei, nr.1}];
        getMarkers($scope.items);
        console.log("Current scope items: ", $scope.items);
    });


    //$scope.items = [{id:123, title: 'test', lat: '46.784010', lon: '23.556620', description: '123'}];
}

if($scope.isLoggedIn){
    getItems();
}

function getShops(){
    GeoItem.getAllShopsFromServer(1, 5).then((allShopsWithDetails) => {
        $scope.allShops = allShopsWithDetails.data;
        console.log("All shops returned from server: ", $scope.allShops);
    });
}

getShops();


/* MARKERS MANAGEMENT */
$scope.onMarkerClicked = onMarkerClicked;

var onMarkerClicked = function (marker) {
      console.log("CLICK");

      marker.showWindow = true;
      $scope.$apply();
      window.alert("Marker: lat: " + marker.latitude + ", lon: " + marker.longitude + " clicked!!")
};


$scope.markers2Events = {

    clicked: function (marker, eventName, model, args) {
    console.log("SOMETHIGN FINALLY HAPPENED!!");
      model.options.labelContent = "Dragged lat: " + model.latitude + " lon: " + model.longitude;
    }
  };


function getMarkers(items){
  $scope.markers2 = [];

  for (var i=0; i<items.length; i++){
    var index = Math.floor((Math.random() * 9) + 1);
    var iconPath = '../images/chest'+index+'.png';
    var newMarker =
    {
          id: items[i].id,
          latitude: items[i].lat,
          longitude: items[i].lon,
          showWindow: false,
          text: items[i].description,
          title: items[i].title,
          options: {
            labelContent: items[i].title,
            labelAnchor: "22 0",
            labelClass: "marker-labels"
          }
        };
      $scope.markers2.push(newMarker);
  }

//  $scope.markers2.forEach( function (marker) {
//    marker.onClicked = function () {
//        alert("merge");
//        onMarkerClicked(marker);
//    };
//    marker.closeClick = function () {
//        marker.showWindow = false;
//        $scope.$evalAsync();
//    };
//  });
}

}]);
