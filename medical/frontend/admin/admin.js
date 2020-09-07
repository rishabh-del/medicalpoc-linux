'use strict';



angular.module('myApp.admin', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngResource', 'angular.filter'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin', {
            templateUrl: 'admin/admin.html',
            controller: 'adminActCtrl'
        });
    }])
    .controller('adminActCtrl', ['$http', '$scope','myService', function ($http, $scope, myService) {
       console.log("admin page")
       $scope.orgDetail =  myService.get();
      // console.log(orgDetail);


       $http.get('/getOrg').then(function (res) {
        console.log("add org res", res);
       // $scope.getResponse = true;
       console.log(res.data);
          $scope.orgDetail = res.data;
          console.log($scope.orgDetail);
        
     }).catch(function (err) {
         alert(err.data);
     });

        $scope.addOrg = function (y) {
            // console.log(user);
            
            $http.post('/deleteOrgFromDb',y).then(function (res) {
                console.log("delete org res", res.data);
               // $scope.getResponse = true;
               
                   //alert("New organization added");
               
             }).catch(function (err) {
                 alert("No add request");
             });
          
             $http.post('/addOrg',y).then(function (res) {
                console.log("add org res", res);
               // $scope.getResponse = true;
               
                   alert("New organization added");
               
             }).catch(function (err) {
                 alert("Organization files Created");
             });
         }
      
    }]);