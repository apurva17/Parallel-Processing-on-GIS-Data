(function () {
    'use strict';

    angular
        .module('app')
        .controller('ServicesCtrl', ServicesCtrl);

    ServicesCtrl.$inject = ['$scope', '$http','UserService','$rootScope','$location'];
    function ServicesCtrl($scope,$http,UserService,$rootScope,$location) {





        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        $scope.services=0;
        $scope.ser=0;
        var service=0;
        var http = new XMLHttpRequest();
        var params = "text=stuff";
        http.open("POST", "http://localhost:3000", true);


        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


        http.send(JSON.stringify({
            type: "Recommendation",
            username: vm.username

        }));


        $http.get('recommended.json').then(function (response) {
            $scope.recommendations = response.data;

        });

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
                .then(function () {
                    loadAllUsers();
                });
        }


        $http.get('recommended.json').then(function (response) {
            $scope.recommendations = response.data;
        });






        $scope.SendData = function () {

            // use $.param jQuery function to serialize data from JSON


            /* $scope.dictionary = {0:"city", 1:"State",2:"zip",3:"min_price",4:"max_price",5:"bedroom",6:"bathroom" };


             var datawithheader=[]

             for (i = 0; i < 7; i++) {

             if($scope.data[i])
             {
             datawithheader.push({field:$scope.dictionary[i],data:$scope.data[i]})

             }

             }*/




            var http = new XMLHttpRequest();
            var params = "text=stuff";
            http.open("POST", "http://localhost:3000", true);


            http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


            //http.setRequestHeader("Content-Type", "application/");

            console.log('sending...');


            http.send(JSON.stringify({
                type: "SEARCH",
                Country: $scope.data[0],
                State: $scope.data[1],
                zip: $scope.data[2],
                min_price: $scope.data[3],
                max_price: $scope.data[4],
                bedroom: $scope.data[5],
                bathroom: $scope.data[6]
            }));


            $http.get('services.json').then(function (response) {
                $scope.services = response.data;
                console.log($scope.services[0]);
            });

        }


        $scope.book = function (obj) {


            var http = new XMLHttpRequest();
            var params = "text=stuff";
            http.open("POST", "http://localhost:3000", true);

            http.onreadystatechange = function () {
                console.log('onreadystatechange');
                if (http.readyState == 4 && http.status == 200) {
                    console.log("jhvgjhvjv");
                }
                else {
                    console.log('readyState=' + http.readyState + ', status: ' + http.status);
                }
            }

            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            console.log('sending...');

            var ID=obj.target.attributes.data.value.toString();
            console.log("i wa clicked");
            console.log(ID);
            $http.get('services.json').then(function (response) {
                $scope.services = response.data[0];
                console.log(response.data[0]);

            });
            $rootScope.IDtoBook=ID;

            for (var i=0;i<$scope.services.length;i++)
            {

                if ($scope.services[i].id == ID)
                {
                    console.log("found");



                    /*http.send( JSON.stringify({
                        type: "BOOKING",
                        ID: ID,
                        Location:$scope.services[i].location,
                        Price: $scope.services[i].price,
                        ReadMore:$scope.services[i].Readmore


                    }));*/

                }

            }

            $location.path('/bookingconfirm');


   }


   $scope.bookingconfirm=function(obj)
   {
       var http = new XMLHttpRequest();
       var params = "text=stuff";
       http.open("POST", "http://localhost:3000", true);


       http.onreadystatechange = function () {
           console.log('onreadystatechange');
           if (http.readyState == 4 && http.status == 200) {
               console.log("jhvgjhvjv");
           }
           else {
               console.log('readyState=' + http.readyState + ', status: ' + http.status);
           }
       }

       http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       console.log('sending...');
       $scope.completelybooked='0';
       $scope.ser=0;
       var ID=obj.target.attributes.data.value.toString();
       alert($rootScope.IDtoBook);
       console.log(parseInt(ID));
       $http.get('services.json').then(function (response) {
           service = response.data[0];
           console.log("sdfdg")
           console.log(response.data[0]);

       });
       console.log("sdcsds");

       console.log(service);

       for (var i=0;i<  service.length;i++)
       {


            console.log(parseInt(service[i].id));

           if (parseInt(service[i].id) ==  parseInt(ID))
           {

               console.log("imhere");


               http.send( JSON.stringify({
                   type: "BOOKING",
                   ID: parseInt(ID),
                   studID:vm.username,

                   completelybooked: $scope.completelybooked


               }));

           }

       }

   }


        $scope.back=function(obj)
        {
            $location.path('/')

        }

        $scope.yes=function(obj)
        {

            $scope.completelybooked='1';
        }

        $scope.no=function(obj)
        {

            $scope.completelybooked='0';
        }

        $scope.delete = function () {


            var http = new XMLHttpRequest();
            var params = "text=stuff";
            http.open("POST", "http://localhost:3000", true);

            http.onreadystatechange = function () {
                console.log('onreadystatechange');
                if (http.readyState == 4 && http.status == 200) {
                    console.log("jhvgjhvjv");
                }
                else {
                    console.log('readyState=' + http.readyState + ', status: ' + http.status);
                }
            }


            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            console.log('sending...');




            var ID=obj.target.attributes.data.value.toString();
            $http.get('services.json').then(function (response) {
                $scope.services = response.data;
            });
            console.log($scope.services[0])
            for (var i=0;i<$scope.services.length;i++)
            {

                if ($scope.services[i].ID == ID)
                {


                    http.send( JSON.stringify({
                        type: "CANCEL",
                        ID: ID,
                        Location:$scope.services[i].location,
                        Price: $scope.services[i].price,
                        ReadMore:$scope.services[i].Readmore


                    }));

                }

            }



        }

    }






})();




