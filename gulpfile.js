var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var minifyJS = require('gulp-uglify');

var trans = require('./');

gulp.task('default', function() {
    gulp.src('data/src/*.md')
        .pipe(trans())
        .pipe(gulp.dest('data/dist'));

    var open = require("open");
    open("./data/dist/sample.html");
});

var cssFiles = [
    'assets/github.css',
    'assets/github2.css',
    'assets/normalize.css',
    'assets/demo.css',
    'assets/icons.css',
    'assets/component.css'
];

var scriptFiles = [
    'assets/jquery.js',
    'assets/jquery.ztree.all-3.5.min.js',
    'assets/ztree_toc.js',
    'assets/toc_conf.js',
    'assets/classie.js',
    'assets/mlpushmenu.js',
    'assets/modernizr.custom.js',
    'assets/jquery.transtool.js',
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
