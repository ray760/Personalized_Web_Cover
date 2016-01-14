(function(angular){
'use strict';

var url = 'json/site-data.json';

var coverApp = angular.module('coverApp', ['ngSanitize'])
.controller('coverController', ['$scope', '$http', '$sce', coverController]);

function coverController($scope, $http, $sce){
  $http.get(url)
    .success(function(response){
      $scope.coverLetter = response.coverLetter[0];

      $scope.pTagTwo = function() {
        return $sce.trustAsHtml($scope.coverLetter.text.pTagTwo);
      }

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
  