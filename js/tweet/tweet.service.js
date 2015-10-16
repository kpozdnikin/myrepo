(function () {
    'use strict';

    angular
        .module('testApp')
        .service('TweetService', TweetService);

    TweetService.$inject = ['$http'];

    function TweetService($http) {

        var service = {
            getOneTweet : getOneTweet
        };
        return service;

        function getOneTweet(tweet) {
            return $http.get('/web/' + tweet, {
            }).then(function(resp) {
                return resp.data || [];
            }, function() {
                return false;
            });
        }
    }
})();
