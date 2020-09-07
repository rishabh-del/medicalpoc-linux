'use strict';



angular.module('myApp.showDoc', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngResource', 'angular.filter'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showDoc', {
            templateUrl: 'showDoc/showDoc.html',
            controller: 'showDocActCtrl'
        });
    }])
    .controller('showDocActCtrl', ['$http', '$scope', 'myService', function ($http, $scope, myService) {
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

        var user = myService.get();

        $scope.tableData = [];
        //console.log(user);
        $http.post('/downloadReport', user).then(function (response) {
            console.log(response.data.length);
            if (response.data.length == 1) {
                $scope.file = response.data[0].file;
                $scope.src = encodeURI($scope.file);

                $scope.iframe = true;

                document.querySelector('#frameevent').src = $scope.src;

            } else {
               // console.log(response.data.length);
                for (var i = 0; i < response.data.length; i++) {
                    $scope.fileData = {
                        data: "data:application/pdf;base64," + response.data[i].file,
                        fileName: response.data[i].dateType,
                        doctorId: response.data[i].doctorId,
                        date: response.data[i].date
                    };
                    $scope.tableData[i] = $scope.fileData;

                }
                //console.log($scope.tableData);
                $scope.src = encodeURI($scope.tableData[$scope.tableData.length - 1].data);
                $scope.iframe = true;
                document.querySelector('#frameevent').src = $scope.src;

            }

        });


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