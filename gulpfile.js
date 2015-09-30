var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var minifyJS = require('gulp-uglify');

var trans = require('./');

gulp.task('default', function() {
    gulp.src('examples/*.md')
        .pipe(trans())
        .pipe(gulp.dest('examples'));

    var open = require("open");
    open("./examples/sample.html");
});

var cssFiles = [
    'assets/css/github.css',
    'assets/css/github2.css',
    'assets/css/normalize.css',
    'assets/css/demo.css',
    'assets/css/icons.css',
    'assets/css/component.css',
    'assets/css/zTreeStyle.css'
];

var scriptFiles = [
    'assets/js/jquery.js',
    'assets/js/modernizr-custom.js',
    'assets/js/classie.js',
    'assets/js/mlpushmenu.js',
    'assets/js/jquery.transtool.js',
    'assets/js/jquery.ztree.all-3.5.js',
    'assets/js/ztree_toc.js',
    'assets/js/app.js',
];

gulp.task('css', function() {
    gulp.src(cssFiles)
        .pipe(concat('app.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
    gulp.src(scriptFiles)
        .pipe(concat('app.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest('dist'));
});

gulp.task('assets', ['css', 'js']);
