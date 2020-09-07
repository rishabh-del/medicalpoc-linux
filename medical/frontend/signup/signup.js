'use strict';



angular.module('myApp.signup', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngResource', 'angular.filter'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/signup', {
            templateUrl: 'signup/signup.html',
            controller: 'signupActCtrl'
        });
    }])
    .controller('signupActCtrl', ['$http', '$scope', '$location', 'myService', function ($http, $scope, $location, myService) {
        // intial data table load start
        $scope.tabPossible = false;

        $scope.signUpData = function (user) {
            // console.log(user);
            
            if (user.email && user.password && user.userType && user.userId != null) {
                if (user.password == user.passRepeat) {
                    $http.post('/signup', user).then(function (res, err) {

                        console.log("got signup response as : ", err, res);
                        myService.set(res);
                        $scope.otpCard = true;
                        //window.location.href = 'hom.html#!/login';


                    }).catch(function (err) {
                        alert(err.data);
                    });
                } else {
                    alert("Both password should match!");
                }
            } else {
                alert("All fields are mandatory!");

            }
        }

        $scope.otpVerify = function (otp) {
            var userData = myService.get().data[0];
            console.log(userData);
            userData.verified = true;
            let user = {
                userData: userData,
                otp: otp
            }
            $http.post('/verifyUser', user).then(function (res, err) {

                console.log("got signup response as : ", err, res);
                $scope.otpCard = false;
                
                //window.location.href = 'hom.html#!/login';
                $location.path('/login');

            }).catch(function (err) {
                alert(err.data);
            });
        }


    }]);