angular.module('WidgetApp.controllers', []).
  controller('ServiceController',['$scope','$http', function ($scope,$http) {
     
      $scope.jsonData = [];
      $scope.jsonImage = [];

      // query URL to get weather data
      var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20%28select%20woeid%20from%20geo.places%281%29%20where%20text%3D%22mclean%2C%20va%22%29&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithke';

      var wData;
      var image;
      $http.get(url)
          .success(function (json) {
              wData = json.query.results.channel;
              // get location and temperature
              $scope.jsonData = wData;
              // get weather image
              image = wData.item.description.split("<")[2];
              image = image.split('"')[1];
              $scope.jsonImage = image;
          })
         .error(function (error, status) {
             $log.warn("error retrieving data");
             $log.log("error" + error);
             $log.log("status" + status);
         });
      
         }]).directive('myWidget', function () {
              return {
                  templateUrl: 'app/widget/my-widget.html'
             };
         });

     

    