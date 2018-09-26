(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService','$http'];
    function LoginController($location, AuthenticationService, FlashService,$http) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;



            var http = new XMLHttpRequest();
            var params = "text=stuff";
            http.open("POST", "http://localhost:3000", true);




            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);


                    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    console.log("here for login");


                   /* http.send( JSON.stringify({
                        type: "authentication",
                        username: vm.user.username,
                        password:vm.user.password


                    }));
*/
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;

                }





                http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                console.log("here for login");


                http.send( JSON.stringify({
                    type: "authentication",
                    username: vm.user.username,
                    password:vm.user.password


                }));



            });
        };
    }

})();
