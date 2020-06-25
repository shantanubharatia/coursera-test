(function() {
    'use strict';

    
        var signupController = function(MenuService) {
        var vm = this;

        vm.user = {};
        vm.favoriteDish = {};

        vm.showError = false;      
        vm.showMessage = false;     

        vm.signup = function(form) {
            vm.showError = false;
            vm.showMessage = false;

            if(form.$invalid) {
                console.log('The form is not valid');
                return;
            }

            MenuService.getFavoriteDish(vm.user.favoriteDish).then(function(response) {
                vm.user.favoriteDishDetails = response.data;
                console.log(vm.favoriteDish);
                MenuService.saveUser(vm.user);
                vm.showMessage = true;
            }, function(error) {
                console.log(error);
                vm.showError = true;
            });

        }
    };

    angular.module('public').controller('SignupController', signupController);
    signupController.$inject = ['MenuService'];

    
})();