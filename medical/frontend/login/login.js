'use strict';



angular.module('myApp.login', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngResource', 'angular.filter'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginActCtrl'
        });
    }])
    .controller('loginActCtrl', ['$http', '$scope','$location', 'myService', function ($http, $scope, $location, myService) {
        // intial data table load start
        $scope.tabPossible = false;

        $scope.getUser = function (user) {
            console.log(user);
            $http.post('/loginPage',user).then(function (res) {
               console.log("login res", res);
               $scope.getResponse = true;
              
                   // res.redirect('hom.html');
                   if(res.data.role == "Patient" && res.data.verified == true){
                       $scope.prescript = false;
                       myService.set(res);
                 // window.location.href = 'hom.html#!/landing';
                 
             $location.path('/landing');

                   }else{
                    myService.set(user);
                alert("User Not Verified! SignUp Again");
                   }
              
            }).catch(function (err) {
                alert(err.data);
            });
        }
       


    }]);