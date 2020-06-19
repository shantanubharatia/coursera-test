(function(){

    'use strict';

    angular.module('MenuApp')
    .component('itemsComponent',{
        templateUrl:'items.component.html',
        bindings:{
            items:'<'
        }
    })

})();