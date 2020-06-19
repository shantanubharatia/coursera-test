(function(){

    'use strict';

    angular.module('MenuApp')
    .component('categoriesComponent',{
        templateUrl:'HomePage.html',
        bindings:{
            categories:'<'
        }
    })

})();