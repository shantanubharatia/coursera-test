(function(){

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            // Home page
            .state('home', {
                url: '/home',
                templateUrl: 'HomePage.html'
              })

            .state('categories', {
                url: '/categories',
                templateUrl: 'categories.component.html',
                controller: 'categoriesController as categoriesCtrl',
                resolve: {
                    categories: ['MenuDataService', function(MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                    
                }
            })

            .state('items', {
                url: '/categories/{categoryShortName}',
                templateUrl: 'items.component.html',
                controller: 'itemsController as itemsCtrl',
                params: {
                    categoryShortName: null,
                    categoryName: null
                },
                resolve: {
                    items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                    }]
                }
            });
        };



})();