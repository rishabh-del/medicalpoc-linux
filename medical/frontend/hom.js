'use strict';

// Declare app level module which depends on views, and core components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.signup',
  'myApp.landing',
  'myApp.history',
  'myApp.index',
  'myApp.admin',
  'myApp.requestOrg',
  'myApp.showDoc',
  'myApp.showTable',
  'myApp.request',
  'myApp.reimburse'
]).
  config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({ redirectTo: '/index' });

  }]);

myApp.controller('homeController', function ($http, $scope, $location) {


  $scope.logout = function () {
    console.log("in");
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    $location.path('/hom');
    // $http.get('/logout', function (res) {
    //   console.log(res);

    // });
  }

  console.log(document.URL);
  console.log(document.namespaceURI);


});