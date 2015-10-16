var app = angular.module('testApp', [
        'ngRoute',
        'ngAnimate'
    ]);

app.controller('MainController', function($scope) {
});

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/',{
            controller: 'TweetsController',
            templateUrl: '/views/tweets.html'
        })
        .when('/:id',{
            controller: 'TweetController',
            templateUrl: '/views/tweet.html'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

