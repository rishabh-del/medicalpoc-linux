'use strict';



angular.module('myApp.requestOrg', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngResource', 'angular.filter'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/requestOrg', {
            templateUrl: 'requestOrg/requestOrg.html',
            controller: 'requestOrgActCtrl'
        });
    }])
    .controller('requestOrgActCtrl', ['$http', '$scope','myService', function ($http, $scope, myService) {
       console.log("requestOrg page")
      
        $scope.addOrg = function (user) {
            // console.log(user);
            
            myService.set(user);
            $http.post('/addOrgDetailToDb',user).then(function (res) {
                console.log("add org res", res);
               // $scope.getResponse = true;
               alert("Request sent to Admin");
               
             }).catch(function (err) {
                 alert(err.data);
             });
          
      
         }
      
    }]);