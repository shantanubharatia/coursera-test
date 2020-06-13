(function (){

    'use strict'
    console.log('inside app.js javascript file');


    angular.module('NarrowItDownApp', [])
    .controller ('NarrowItDownController', NarrowItDownController)
    .service ('MenuSearchService', MenuSearchService)
    .directive ('foundItems', foundItemsDirective);


    function foundItemsDirective()
    {
        var ddo={
            templateUrl: 'foundItems.html',
            scope:{
                items: '<',
                onRemove: '&'
            }
            // controller: foundItemsDirectiveController,
            // bindToController: true,
            // controllerAs: 'dir'
        };

        return ddo;
    }

    // function foundItemsDirectiveController()
    // {
    //     var dir=this;

    // }


    NarrowItDownController.inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService)
    {
        var Ctrl=this;
        Ctrl.textInput=""
        Ctrl.foundItems=[];

        Ctrl.narrow = function()
        {
            console.log("Narrow Function called");
            console.log(Ctrl.textInput);

            var promise = MenuSearchService.getAllMenuItems();
            promise.then(function(response){
                // console.log(response.data);

                var filteredItems=[];
                for (var i=0;i<response.data.menu_items.length;i++)
                {
                    // console.log(i," = ",response.data.menu_items[i]);
                    if(response.data.menu_items[i].description.toLowerCase().indexOf(Ctrl.textInput)!=-1)
                    {
                        console.log("found ", response.data.menu_items[i]);
                        Ctrl.foundItems.push(response.data.menu_items[i]);
                    }
                }
                console.log("found Items = ", Ctrl.foundItems);

                return Ctrl.foundItems
                
            })
            .catch(function(response){
                console.log("Error")
                console.log(response);
            })

        }

        Ctrl.removeItem = function (itemIndex) {
            console.log("itemIndex is ",itemIndex);
            Ctrl.foundItems.splice(itemIndex,1);
        };
    }

    MenuSearchService.inject = ['$http']
    function MenuSearchService($http)
    {
        var service=this;
        // service.foundItems=[];

        service.getAllMenuItems = function()
        {
            var response = $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            });
            return response;
        }

        // service.getMatchedMenuItems = function(textInput)
        // {
        //     var promise=service.getAllMenuItems();
        //     console.log(textInput);
        //     console.log("promise is ",promise);
        //     promise.then(function(response){
        //         // console.log(response.data);

        //         var filteredItems=[];
        //         for (var i=0;i<response.data.menu_items.length;i++)
        //         {
        //             // console.log(i," = ",response.data.menu_items[i]);
        //             if(response.data.menu_items[i].description.indexOf(textInput)!=-1)
        //             {
        //                 console.log("found ", response.data.menu_items[i]);
        //                 service.foundItems.push(response.data.menu_items[i]);
        //             }
        //         }
        //         console.log("found Items = ", service.foundItems);

        //         return service.foundItems
                
        //     })
        //     .catch(function(response){
        //         console.log("Error")
        //         console.log(response);
        //     })
        // }

    }
    


})();