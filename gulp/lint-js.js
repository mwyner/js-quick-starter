'use strict';
var gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish');

gulp.task('lint-js', function() {
  gulp.src('./src/**/*.js')
      .pipe( jshint() )
      .pipe( jshint.reporter(stylish) );
});


gulp.task('watch-lint', function() {
  gulp.watch([ './src/**/*.js' ], ['lint-js']);
});
