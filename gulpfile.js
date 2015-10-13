var minifyCss = require('gulp-minify-css'), // ����������� CSS;
    uglify = require('gulp-uglify'), // ����������� JS
    concat = require('gulp-concat'), // ������� ������
    linker = require('gulp-linker'), // �������� ������ �� �����
    merge = require('merge-stream'),
    rename = require('gulp-rename'),
    angularTemplateCache = require('gulp-angular-templatecache'), //����������� Angular ��������
    cssRebaseUrls = require('gulp-css-rebase-urls'),
    gulp = require('gulp');
var scriptsFilesList = [

];
var ccsFilesList = [

];
// �������� JS
function jsToMin() {
    return gulp.src(scriptsFilesList)
        //
        .pipe(uglify({mangle: false})) // ������� JS �����
        .pipe(concat('app.min.js')) // �������� ��� JS, ����� ��� ������� ��������� � ./assets/js/vendor/**

        .pipe(gulp.dest('./public/js/'));
}

gulp.task('jsToMin', function () {
    return jsToMin();
});

// �������� CSS
function cssToMin() {
    return gulp.src(ccsFilesList)
        .pipe(cssRebaseUrls({root: '/public/css'}))
        .pipe(concat('app.min.css')) // �������� ��� css ���� � ����
        .pipe(minifyCss())
        .pipe(gulp.dest('./public/css/')); // ���������� css;
}
gulp.task('cssToMin', function () {
    return cssToMin();
});

// ���������� ������ �� js/css �����
function createTplForDevelopment() {
    // Read templates
    return gulp.src('develop/main.tpl')
        // Link the JavaScript
        .pipe(linker({
            scripts: scriptsFilesList,
            startTag: '<!--SCRIPTS-->',
            endTag: '<!--SCRIPTS END-->',
            fileTmpl: '<script src="/\%s?v={$version}"></script>',
            appRoot: 'www/'
        }))
        // Link the CSS
        .pipe(linker({
            scripts: ccsFilesList,
            startTag: '<!--STYLES-->',
            endTag: '<!--STYLES END-->',
            fileTmpl: '<link rel="stylesheet" type="text/css" href="/\%s?v={$version}"/>',
            appRoot: 'www/'
        }))
        // Write modified files to www/
        .pipe(gulp.dest('protected/views/'));
}
gulp.task('createTplForDevelopment', function () {
    return createTplForDevelopment();
});

// ���������� ������ �� js/css �����
function createTplForProduction() {
    // Read templates
    return gulp.src('develop/main.tpl')
        // Link the JavaScript
        .pipe(linker({
            scripts: ['public/js/app.min.js', 'public/js/templates.js'],
            startTag: '<!--SCRIPTS-->',
            endTag: '<!--SCRIPTS END-->',
            fileTmpl: '<script src="/\%s?v={$version}"></script>',
            appRoot: 'www/'
        }))
        // Link the CSS
        .pipe(linker({
            scripts: ['public/css/app.min.css'],
            startTag: '<!--STYLES-->',
            endTag: '<!--STYLES END-->',
            fileTmpl: '<link rel="stylesheet" type="text/css" href="/\%s?v={$version}"/>',
            appRoot: 'www/'
        }))
        // Write modified files to www/
        .pipe(gulp.dest('protected/views/'));
}
gulp.task('createTplForProduction', function () {
    return createTplForProduction();
});

//��������� ���� ��������
function generateTemplateCache() {
    //console.log('Creating an AngularJS $templateCache');
    var transformUrl = function (url) {
        return url.replace(/\.html$/, ".html?v=\" + io.version + \"");
    };
    return gulp.src(['public/**/*.html', '!public/bower_components/**/*.html'])
        .pipe(angularTemplateCache('templates.js', {
            module: 'app.productionCache',
            root: '/public/',
            transformUrl: transformUrl
        }))
        .pipe(gulp.dest('public/js'));

}

gulp.task('generateTemplateCache', function () {
    return generateTemplateCache();
});
gulp.task('dev', function () {
    return merge(
        createTplForDevelopment()
    );
});
gulp.task('prod', ['cssToMin', 'generateTemplateCache', 'jsToMin'], function () {
    return merge(
        createTplForProduction()
    );
});
