'use strict';



angular.module('myApp.showTable', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngResource', 'angular.filter'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showTable', {
            templateUrl: 'showTable/showTable.html',
            controller: 'showTableActCtrl'
        });
    }])
    .controller('showTableActCtrl', ['$http', '$scope', 'myService', function ($http, $scope, myService) {
        $scope.tabPossible = true;
        $scope.iframe = false;

        $scope.patientKey = myService.get();

        $scope.allHistory = function (patient) {
            console.log(patient);
            $http.post('/allmedicalHistory', patient).then(function (response) {
                $scope.userDetail = response.data;
                // $scope.allFiles[0] = $scope.userDetail;
                console.log($scope.userDetail);
                for (var i = 0; i < $scope.userDetail.length; i++) {
                    let base64String = $scope.userDetail[i].Record.file;
                    // Remove header
                    let base64Image = base64String.split(';base64,').pop();

                }
            });
        }

        $scope.downloadCurrentFile = async function (data) {


            let user = {
                key: '865',
                date_from: '',
                date_to: '',
                dataType: data
            }
            myService.set(user);
            window.location.href = 'hom.html#!/showDoc';
            
           

        }

    }]).directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);