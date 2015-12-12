'use strict';
var gulp       = require('gulp'),
    size       = require('gulp-size'),
    less       = require('gulp-less'),
    minifyCSS  = require('gulp-minify-css');


// LESS -> CSS
// ===========
gulp.task('build-css', function() {
  gulp.src( './src/main.less' ) // main entry point [@imports file]
      .pipe( less({ compress: true }) )
      .pipe( minifyCSS() )
      .pipe( size({ showFiles: true, pretty: true }) )
      .pipe( gulp.dest( './dist/css' ) );
});

gulp.task('watch-css', function() {
  gulp.watch([ './src/**/*.less' ], ['build-css']);
});
