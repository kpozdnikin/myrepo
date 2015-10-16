(function () {
    'use strict';

    angular
        .module('testApp')
        .service('TweetsService', TweetsService);

    TweetsService.$inject = ['$http'];

    function TweetsService($http) {

        var service = {
            getTweets : getTweets
        };
        return service;

        function getTweets() {
            return $http.get('/web/', {
            }).then(function(resp) {
                return resp.data || [];
            }, function() {
                return false;
            });
        }
    }
})();
