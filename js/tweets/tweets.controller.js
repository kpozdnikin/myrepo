(function () {
    'use strict';

    angular
        .module('testApp')
        .controller('TweetsController', TweetsController);

    TweetsController.$inject = ['$scope', 'TweetsService'];

    function TweetsController($scope, TweetsService) {
        $scope.val = 0;
        $scope.arr = 0;
        function init(){
            TweetsService.getTweets().then(function (resp) {
                $scope.tweets = resp;
                $scope.arr = $.map($scope.tweets, function(el){
                    return el;
                });
                $scope.filter = $scope.arr.filter(function(item){
                    return  item;
                });
            });
        }
        init();
        //Здесь каждый раз просто накладываем новый фильтр
        $scope.ChangeFilter = function(){
            if($scope.val == "all")
            {
                $scope.filter = $scope.arr.filter(function(item){
                    return  item;
                });
            }
            else if($scope.val == "media")
            {
                $scope.filter = $scope.arr.filter(function(item){
                    if(item['url'] || item['img'] || item['video'])
                        return  item;
                });
            }
            else {
                $scope.filter = $scope.arr.filter(function (item) {
                    return item[$scope.val];
                });
            }
        };
    }
})();
