(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService','$http'];
    function RegisterController(UserService, $location, $rootScope, FlashService,$http) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });

            var http = new XMLHttpRequest();
            var params = "text=stuff";
            http.open("POST", "http://localhost:3000", true);


            http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");



            http.send( JSON.stringify({
                type: "Registeration",
                firstname: vm.user.firstName,
                lastname:vm.user.lastName,
                username: vm.user.username,
                password:vm.user.password,
                Ethnicity:vm.user.Ethnicity,
                location:vm.user.Location,
                gender:vm.user.Gender



            }));



        }
    }

})();
