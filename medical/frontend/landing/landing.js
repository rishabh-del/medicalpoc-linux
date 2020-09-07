'use strict';



angular.module('myApp.landing', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngResource', 'angular.filter'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/landing', {
            templateUrl: 'landing/landing.html',
            controller: 'landingActCtrl'
        });
    }])
    .controller('landingActCtrl', ['$http', '$scope', '$location', 'myService', function ($http, $scope, $location, myService) {
        $scope.tabPossible = true;
        $scope.iframe = null;
        $scope.profileClick = false;
    //    $scope.islogout = true;

        $scope.patientData = myService.get().data;
        console.log(myService.get().data);
        //console.log(myServ)
        // $http.post('/landing', $scope.patientData).then(function (response) {
        //     console.log(response);
        // })
        $scope.myLanding = function(){
            $location.path('landing/landing.html');
        }
        $scope.myRequest = function(){
            $location.path('Request/Request.html');
        }

        $scope.openPage = (data) => {
            if(data === 'reimburse'){
            $location.path('/reimburse');
            }else{
            $location.path('/landing');
                
            }
        }

        // Get the element with id="defaultOpen" and click on it
        // document.getElementById("defaultOpen").click();

        if ($scope.patientData != undefined) {
            document.cookie = "name=" + $scope.patientData.name + ";"
            document.cookie = "userId=" + $scope.patientData.userId + ";"
            document.cookie = "emailID=" + $scope.patientData.emailID + ";"
            document.cookie = "mobile=" + $scope.patientData.mobile + ";"
            document.cookie = "expires=Thu, 18 Dec 2020 12:00:00 UTC";
        } else {
            $scope.patientData = {
                name: document.cookie.split(";")[0].split("=")[1] || '',
                userId: document.cookie.split(";")[1].split("=")[1] || '',
                emailID: document.cookie.split(";")[2].split("=")[1] || '',
                mobile: document.cookie.split(";")[3].split("=")[1] || '',
            }
        }
        //console.log($scope.patientData, document.cookie);
        $scope.allHistory = function (patient) {
            //console.log(patient);
            $http.post('/allmedicalHistory', patient).then(function (response) {
                $scope.userDetail = response.data;
                // $scope.allFiles[0] = $scope.userDetail;
                //console.log($scope.userDetail);
                for (var i = 0; i < $scope.userDetail.length; i++) {
                    let base64String = $scope.userDetail[i].Record.file;
                    // Remove header
                    let base64Image = base64String.split(';base64,').pop();

                }
            });
        }

        document.getElementById("myDIV").style.display = "none";
        $scope.profile = function (patientData) {
            $scope.profileClick = true;

            $scope.patientData = patientData;
            var x = document.getElementById("myDIV");
            if (x.style.display === "none") {
                x.style.display = "block";

            } else {
                x.style.display = "none";
            }
        }

        $scope.getPdf = function (filename, data) {
            function download(filename, data) {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:application/pdf;base64,' + encodeURIComponent(data.split(",")[1]));
                //console.log('data:application/pdf;base64,' + encodeURIComponent(data.split(",")[1]));
                element.setAttribute('download', filename);
                element.style.display = 'none';  
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }

            // Start file download.
            download(filename + '.pdf', data);
        }

        $scope.downloadCurrentFile = async function (data) {
            let user = {
                key: document.cookie.split(";")[1].split("=")[1] || '',
                date_from: '',
                date_to: '',
                dataType: data
            }
            myService.set(user);

            $scope.tableData = [];
            //console.log(user);
            $http.post('/downloadReport', user).then(function (response) {

                if (response.data.length == 1) {
                    $scope.file = "data:application/pdf;base64," + response.data[0].file;
                    $scope.iframe = true;
                    $scope.src = encodeURI($scope.file);
                   document.getElementById("customers").style.overflowY = "auto"
                    //console.log($scope.src);
                    document.querySelector('#frameevent').src = $scope.src;

                } else {
                    $scope.iframe = false;

                    for (var i = 0; i < response.data.length; i++) {

                        // var doctor = '';
                        // var doctorName = response.data[i].doctorId.match(/[A-Z][a-z]+/g);
                        // for (var j = 0; j < doctorName.length; j++) {
                        //     doctor = doctor + " " + doctorName[j];
                        // }
                        //console.log(doctor, response.data[0].file);
                        $scope.fileData = {
                            data: "data:application/pdf;base64," + response.data[i].file,
                            fileName: user.dataType,
                            date: response.data[i].date
                        };
                        $scope.tableData[i] = $scope.fileData;

                    }

                    //console.log($scope.tableData);
                    $scope.src = $scope.tableData;
                    //console.log($scope.src);
                    //document.querySelector('#tableevent').src = $scope. position: fixed;
     

                    console.log(response.data.length);
                    if (response.data.length > 7) {
                        document.getElementById("customers").style.overflowY = "scroll";
                        document.getElementById("customers").style.position = "fixed";
                      
                        document.getElementById("customers").style.height = "60vh";
                        document.getElementById("customers").style.left = "50vh";
                        document.getElementById("customers").style.top = "18vh";
                        document.getElementById("customers").style.color = "black";

                    } else {
                        document.getElementById("customers").removeAttribute("style");
                        document.getElementById("customers").style.position = "fixed";

                        document.getElementById("customers").style.left = "50vh";
                        document.getElementById("customers").style.top = "18vh";
                        document.getElementById("customers").style.color = "black";
                    }
                }

            });
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