'use strict';



angular.module('myApp.reimburse', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngResource', 'angular.filter'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/reimburse', {
            templateUrl: 'reimburse/reimburse.html',
            controller: 'reimburseActCtrl'
        });
    }])
    .controller('reimburseActCtrl', ['$http', '$scope', 'myService', '$location', function ($http, $scope, myService, $location) {
        $scope.tabular = true;
        document.getElementById('tabular').style.display = "block";
        //  document.getElementById('logoutDiv').style.display = "block";
        console.log($scope.cityName);
        $scope.clickedButton = $scope.cityName;
        // myService.set($scope.clickedButton);
        $scope.logout = false;
        $scope.data = {
            pending: 115,
            rejected: 113,
            confirmed: 212
        }
        $scope.tableData = [{
            date: 'Jan 15 | 03:31 PM',
            id: '224633',
            status: $scope.clickedButton
        },
        {
            date: 'Feb 17 | 02:16 PM',
            id: '224443',
            status: $scope.clickedButton
        }, {
            date: 'Jan 24 | 12:14 PM',
            id: '125467',
            status: $scope.clickedButton
        }, {
            date: 'Jan 12 | 10:21 PM',
            id: '243576',
            status: $scope.clickedButton
        }, {
            date: 'Jan 18 | 08:11 PM',
            id: '221233',
            status: $scope.clickedButton
        }]

        if ($scope.clickedButton == 'Pending') {
            var all = document.getElementsByClassName("statusBox")
            for (var i = 0; i < all.length; i++) {
                all[i].style.backgroundColor = 'yellow';
            }
        } else if ($scope.clickedButton == 'Confirmed') {
            var all = document.getElementsByClassName("statusBox")
            for (var i = 0; i < all.length; i++) {
                all[i].style.backgroundColor = 'green';
            }
        } else {
            var all = document.getElementsByClassName("statusBox")
            for (var i = 0; i < all.length; i++) {
                all[i].style.backgroundColor = 'red';
            }
        }

        $scope.openPage = (data) => {
            if (data === 'reimburse') {
                $location.path('/reimburse');
            } else {
                $location.path('/landing');

            }
        }

        $scope.patientProfile = function (data) {
            //  myService.set(data);
            $location.path('/bill');
        }


        $(document).ready(function () {
            var counter = 0;

            $("#addrow").on("click", function () {
                var newRow = $("<tr>");
                var cols = "";

                cols += '<td> <select class="form-control" name="type" id="status"><option value="Pending">Informed consent for treatment & procedure</option><option value="Pending">Admission nursing history</option><option value="Pending">Family history</option><option value="Pending">Physical examination finding</option><option value="Pending">Medical history</option><option value="Pending">Tentative history</option><option value="Pending">Medical diagnosis</option><option value="Pending">Therapeutic order</option><option value="Pending">Treatment given</option><option value="Pending">Medical progress notes</option><option value="Pending">Supportive care given</option><option value="Pending">Reports of diagnosis studies</option><option value="Pending">Final diagnosis</option><option value="Pending">Patient education</option><option value="Pending">Summary of operative procedures</option><option value="Pending">Discharge plan and summary</option><option value="Pending">Any specific instructions</option></select>"</td>';
                cols += '<td><input type="number" name="estimate" class="form-control" /></td>';
                cols += '<td><input type="file" name="browse" class="btn btn-primary form-control"/></td>'
                cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';
                newRow.append(cols);
                $("table.order-list").append(newRow);
                counter++;
            });



            $("table.order-list").on("click", ".ibtnDel", function (event) {
                $(this).closest("tr").remove();
                counter -= 1
            });


        });



        function calculateRow(row) {
            var price = +row.find('input[name^="price"]').val();

        }

        function calculateGrandTotal() {
            var grandTotal = 0;
            $("table.order-list").find('input[name^="price"]').each(function () {
                grandTotal += +$(this).val();
            });
            $("#grandtotal").text(grandTotal.toFixed(2));
        }
    }]);