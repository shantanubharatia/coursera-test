(function (){

    'use strict'
    console.log('inside app.js javascript file');


    angular.module('ShoppingListCheckOff', [])
    .controller ('ToBuyController', ToBuyController)
    .controller ('AlreadyBoughtController', AlreadyBoughtController)
    .service ('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject=['ShoppingListCheckOffService']
    function ToBuyController(ShoppingListCheckOffService)
    {
        var Buy=this;
        Buy.a="test";
        Buy.toBuy=ShoppingListCheckOffService.itemsBuy();
        console.log(this);
       
        Buy.check = function()
        {
            if(Buy.toBuy.length>0)
            {
                return false;
            }
            return true;
        }

        Buy.Bought = function(index)
        {
            console.log("Inside Bought function");
            ShoppingListCheckOffService.change(index);
        }

    }

    AlreadyBoughtController.$inject=['ShoppingListCheckOffService']
    function AlreadyBoughtController(ShoppingListCheckOffService)
    {
        var Bought=this;
        Bought.AlreadyBought = ShoppingListCheckOffService.itemsBought();
        Bought.check = function()
        {
            if (Bought.AlreadyBought.length>0)
            {
                return false
            }
            return true;   
        }
    }

    function ShoppingListCheckOffService()
    {
        var service = this;
        // var ToBuy=['hello','I','Shantanu'];
        var ToBuy=[{name:"Cookies", quantity:"10"},{name:"Apples", quantity:"20"},{name:"Bananas", quantity:"50"},{name:"Donuts", quantity:"40"},{name:"Eggs", quantity:"30"}]
        // var ToBuy=[];
        // var Bought=['testBoughtTemp'];
        var Bought=[];

        service.itemsBuy = function()
        {
            return ToBuy;
        }

        service.itemsBought = function()
        {
            return Bought;
        }

        service.change = function(index)
        {
            // console.log("Inside change function");
            var a =  ToBuy.splice(index,1);
            // console.log(a);
            // console.log(a[0]);
            var item = {name:a[0].name, quantity:a[0].quantity}
            Bought.push(item);
            // console.log(Bought);
        }


    }


})();