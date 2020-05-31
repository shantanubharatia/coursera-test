(function (){

    'use strict'
    console.log('inside app.js javascript file');


    angular.module('LunchCheck', [])
    .controller ('lunchCheckController', function1);

    function1.$inject=['$scope']
    function function1($scope){
        $scope.inputText='';

        $scope.clickFunction = function()
        {
            console.log("Inside Click Function")
            var words = $scope.inputText.split(',');
            console.log(" Length = " + words.length);
            if($scope.inputText.length==0)
            {
                $scope.msg = "Please enter data first"
            }
            else if (words.length > 3)
            {
                $scope.msg = "Too much"
            }
            else
            {
                $scope.msg = "Enjoy!"
            }
        }
        
    }


})();