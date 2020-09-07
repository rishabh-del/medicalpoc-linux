'use strict';



angular.module('myApp.index', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngResource', 'angular.filter'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/index', {
            templateUrl: 'index/index.html',
            controller: 'indexActCtrl'
        });
    }])
    .controller('indexActCtrl', ['$http', '$scope','myService', function ($http, $scope, myService) {
   
        $scope.tabPossible = false;

        $scope.addOrg = function () {
           // console.log(user);
           
            var orgDetail = {
                orgname : "org3",
                chaincodeversion : "3.0"
            }
            myService.set(orgDetail);
            console.log("inside");
           // window.location.href = 'hom.html#!/admin';
           
        }

        $http.get("/getAllPdf").then(function(res){
console.log(res.data);
        })


    }]);