(function () {
    'use strict';

    angular
        .module('testApp')
        .controller('TweetController', TweetController);

    TweetController.$inject = ['$scope', '$routeParams', 'TweetService'];

    function TweetController($scope, $routeParams, TweetService) {
        $scope.params = $routeParams;
        function init(){
            TweetService.getOneTweet($scope.params.id).then(function (resp) {
                $scope.tweet = resp;
            });
        }
        init();
    }
})();
