var minifyCss = require('gulp-minify-css'), // Минификация CSS;
    uglify = require('gulp-uglify'), // Минификация JS
    concat = require('gulp-concat'), // Склейка файлов
    sass = require('gulp-ruby-sass'),
    merge = require('merge-stream'),
    cssRebaseUrls = require('gulp-css-rebase-urls'),
    gulp = require('gulp'),
    debug = require('gulp-debug');

var scriptsFilesList = [
    //jquery
    'bower_components/jquery/dist/jquery.min.js',
    //bootstrap
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    //angular
    'bower_components/angular/angular.min.js',
    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/angular-route/angular-route.min.js',
    //my files
    'js/app.js',
    'js/**/*.controller.js',
    'js/**/*.service.js'
];
var ccsFilesList = [
    'bower_components/bootstrap/dist/css/bootstrap.min.css'
];

var sassFileList = [
    'bower_components/bootstrap-sass/assets/stylesheets'
];
// Собираем JS
function jsToMin() {
    return gulp.src(scriptsFilesList)
        .pipe(uglify({mangle: false})) // Сжимаем JS файлы
        .pipe(concat('app.min.js')) // Собираем все JS, кроме тех которые находятся в ./assets/js/vendor/**
        .pipe(gulp.dest('./js/'))
        .pipe(debug({title: 'unicorn:'}));
}

gulp.task('jsToMin', function () {
    return jsToMin();
});

// Собираем CSS
function cssToMin() {
    return gulp.src(ccsFilesList)
        .pipe(cssRebaseUrls({root: '/css'}))
        .pipe(concat('app.min.css')) // Собираем все css файл в один
        .pipe(minifyCss())
        .pipe(gulp.dest('./css/')) // записываем css;
        .pipe(debug({title: 'unicorn:'}));
}
gulp.task('cssToMin', function () {
    return cssToMin();
});

// Собираем SASS
function sassToMin() {
    return gulp.src(sassFileList)
        .pipe(sass({
            style: 'compressed',
            loadPath: [
                sassFileList
            ]
        }))
        .pipe(gulp.dest('./css'))
        .pipe(debug({title: 'unicorn:'}));
}
gulp.task('sassToMin', function () {
    return sassToMin();
});

// Генерируем ссылки на js/css Файлы
/*function createTplForDevelopment() {
    var Dir = '';
    // Read templates
    return gulp.src('/index.html')
        // Link the JavaScript
        .pipe(linker({
            scripts: scriptsFilesList,
            startTag: '<!--SCRIPTS-->',
            endTag: '<!--SCRIPTS END-->',
            fileTmpl: '<script src="\%s"></script>',
            appRoot: '/'
        }))
        // Link the CSS
        .pipe(linker({
            scripts: ccsFilesList,
            startTag: '<!--STYLES-->',
            endTag: '<!--STYLES END-->',
            fileTmpl: '<link rel="stylesheet" type="text/css" href="\%s"/>',
            appRoot: '/'
        }))
        // Write modified files to /
        .pipe(gulp.dest('/'))
        .pipe(debug({title: 'unicorn:'}));
}
gulp.task('createTplForDevelopment', function () {
    return createTplForDevelopment();
});

gulp.task('dev', ['cssToMin', 'jsToMin'], function () {
    return merge(
        createTplForDevelopment()
    );
});*/

// Задача по умолчанию
gulp.task('default', ['cssToMin', 'jsToMin'], function () {
    return merge(
        cssToMin(),
        jsToMin()
    );
});