(function(angular){
'use strict';

var url = 'json/site-data.json';

var coverApp = angular.module('coverApp', [])
.controller('coverController', ['$scope', '$http', coverController]);

function coverController($scope, $http){
  $http.get(url)
    .success(function(response){
      $scope.coverLetter = response.coverLetter[0];

      $scope.fullName = function(){
  	    return $scope.coverLetter.name.first + " " + $scope.coverLetter.name.last;
      }
    });  
}

}(window.angular));

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function(){
  document.getElementById('rayfolio-dell').style.visibility = "visible";
});
  