'use strict';
/* main App Controllers */

var mainAppControllers = angular.module('mainAppControllers', []);

mainAppControllers.controller('LoginCtrl', ['$scope', '$http','$window','$location', "cryptoJSService",
    function ($scope, $http,$window,cryptoJSService) {

        console.log(cryptoJSService.cryptoJS);
        //var cryptoJS = new CryptoJSService();
        //console.log(cryptoJS.cryptoJS);

        //var key512Bits1000Iterations = CryptoJSService.PBKDF2("Secret Passphrase", 'salt', { keySize: 512/32, iterations: 1000 });

        //console.log(key512Bits1000Iterations);

        console.log("xd");

        $scope.failed_login = "";

        $scope.submit = function()
        {
            var user = {"username": $scope.username, "password": $scope.password};

            if($scope.username!==undefined || $scope.password !==undefined){
                $http({method: 'POST', url: '/authenticate', data:user}).
                    success(function(data, status, headers, config) {
                        console.log(data);
                        $window.sessionStorage.token = data.token;
                        console.log($window.sessionStorage);
                        //$window.location.href="/restricted/home";
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                        noty({text: data,  timeout: 2000, type: 'error'});
                    });
            }else{
                noty({text: 'Username and password are mandatory!',  timeout: 2000, type: 'error'});
            }

        }

        $scope.update = function(){

            var data = {"auth_token":$window.sessionStorage.token}

            $http({method: 'POST', url: '/update', data:data}).
                success(function(data, status, headers, config) {
                    console.log(data);

                }).
                error(function(data, status, headers, config) {
                    console.log(data);
                });
        }

    }
]);


mainAppControllers.controller('RegistrationCtrl', ['$scope', '$http','$window','$location',
    function ($scope, $http) {

        $scope.signup = function()
        {
            var user = {"username": $scope.username, "password": $scope.password, "check_password" : $scope.check_password};

            if($scope.username!==undefined || $scope.password !==undefined || $scope.check_password !==undefined){

                if($scope.password !== $scope.check_password){
                    noty({text: 'password and check_password must be the same!',  timeout: 2000, type: 'warning'});
                }else{
                    $http({method: 'POST', url: '/signup', data:user}).
                        success(function(data, status, headers, config) {
                            console.log(data);
                            noty({text: "Username is registered correctly!",  timeout: 2000, type: 'success'});
                        }).
                        error(function(data, status, headers, config) {
                            console.log(data);
                            noty({text: data,  timeout: 2000, type: 'error'});
                        });
                }

            }else{
                noty({text: 'Username and password are mandatory!',  timeout: 2000, type: 'warning'});
            }

        }

    }
]);


/* web App Controllers */


var webAppControllers = angular.module('webAppControllers', []);


webAppControllers.controller('HomeCtrl', ['$scope', '$http','$window','$location',
    function ($scope, $http) {


    }
]);