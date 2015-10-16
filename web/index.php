<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Response;

// web/index.php
require_once __DIR__ . '/../vendor/autoload.php';

$app = new Application();

// ... definitions

//Debug mode
$app['debug'] = true;
//Добавляем хранилище кэша
$app->register(new Silex\Provider\HttpCacheServiceProvider(), array(
    'http_cache.cache_dir' => __DIR__.'/../cache/',
));

$tweets = array(
    1 => array(
        'id' => 1,
        'name' => 'Mr. Freeman',
        'text' => 'Good morning everybody',
        'img' => 'http://wiki.erepublik.com/images/thumb/4/4c/Dr._Gordan_Freemanr.PNG/218px-Dr._Gordan_Freemanr.PNG',
        'url' => '',
        'video' => '',
    ),
    2 => array(
        'id' => 2,
        'name' => 'Mr. Gusman',
        'text' => 'So lets play',
        'img' => '',
        'url' => '',
        'video' => '',
    ),
    3 => array(
        'id' => 3,
        'name' => 'Mr. Obama',
        'text' => 'I like this video and photo',
        'img' => 'http://independentsentinel.com/wp-content/uploads/2015/10/Obama-21.jpg',
        'url' => 'https://instagram.com/kimkardashian/',
        'video' => 'http://www.youtube.com/watch?v=dZOZFbvKIj0',
    ),
    4 => array(
        'id' => 4,
        'name' => 'Mr. Putin',
        'text' => 'I am the Russian President',
        'img' => 'http://user.vse42.ru/files/ui-525239ecc140f7.29640561.jpeg',
        'url' => 'http://kremlin.ru/',
        'video' => '',
    ),
);
//Маршрут Get для получения списка твиттов
$app->get('/', function() use ($tweets) {
    return json_encode($tweets);
});

//Маршрут Get/unique для получения конкретного твитта по маршруту web(api)
$app->get('/web/{unique}', function (Silex\Application $app, $unique) use ($tweets) {
    if (!isset($tweets[$unique])) {
        $app->abort(404, "Unique key {$unique} does not exist.");
    }
    return new Response(json_encode($tweets[$unique]), 200, array(
        'Cache-Control' => 's-maxage=120',
        'ETag' => uniqid()
    ));
});

$app['http_cache']->run();


